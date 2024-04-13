import * as os from "os";
import * as path from "path";
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
	const majorInt = parseInt(major);
	const minorInt = parseInt(minor);

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
		const SMITHY_RELEASE_URL = `https://github.com/awslabs/smithy/releases/download/${smithyVersion}/smithy-cli-${
			platform === "win32" ? "windows" : platform
		}-${getArchitecture()}.${extension}`;

		core.info(`Retrieve Smithy CLI from ${SMITHY_RELEASE_URL}`);

		const smithyTarGzPath = await downloadTool(SMITHY_RELEASE_URL);

		const extractedSmithyFolder = await extract(smithyTarGzPath);

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
