import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import * as core from "@actions/core";
import { downloadTool, extractTar, extractZip } from "@actions/tool-cache";
import { getArchitecture, restore } from "./utils";

function getExtensionAndFunction(smithyVersion: string): {
	extract: typeof extractZip | typeof extractTar;
	extension: "zip" | "tar.gz";
} {
	const SMITHY_MAJOR = 1;
	const SMITHY_MINOR = 47;
	const [major, minor, patch] = smithyVersion.split(".");
	const majorInt = Number.parseInt(major);
	const minorInt = Number.parseInt(minor);

	if (majorInt === SMITHY_MAJOR && minorInt < SMITHY_MINOR) {
		return {
			extract: extractTar,
			extension: "tar.gz",
		};
	}
	return {
		extract: extractZip,
		extension: "zip",
	};
}

async function action() {
	const smithyVersion = core.getInput("version", {
		required: true,
		trimWhitespace: true,
	});

	const smithyBuildPath = core.getInput("smithy-build", {
		required: false,
		trimWhitespace: true,
	});

	const platform = os.platform();

	const { extension, extract } = getExtensionAndFunction(smithyVersion);

	try {
		const SMITHY_RELEASE_URL = `https://github.com/smithy-lang/smithy/releases/download/${smithyVersion}/smithy-cli-${
			platform === "win32" ? "windows" : platform
		}-${getArchitecture()}.${extension}`;

		core.info(`Retrieve Smithy CLI from ${SMITHY_RELEASE_URL}`);

		const smithyArchivePath = await downloadTool(SMITHY_RELEASE_URL);

		let extractedSmithyFolder = await extract(smithyArchivePath);

		const dirs = fs.readdirSync(extractedSmithyFolder);

		if (dirs.length === 1) {
			extractedSmithyFolder = path.join(extractedSmithyFolder, dirs[0]);
		}

		if (smithyBuildPath) {
			await restore(smithyBuildPath);
		}

		core.addPath(path.join(extractedSmithyFolder, "bin"));
		core.setOutput("SMITHY_PATH", extractedSmithyFolder);
	} catch (error) {
		if (error instanceof Error) core.setFailed(error.message);
	}
}

action();
