import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import * as core from "@actions/core";
import { downloadTool, extractTar, extractZip } from "@actions/tool-cache";
import { getArchitecture } from "./utils";

function getExtensionAndFunction(smithyVersion?: string): {
	extract: typeof extractZip | typeof extractTar;
	extension: "zip" | "tar.gz";
} {
	const SMITHY_MAJOR = 1;
	const SMITHY_MINOR = 47;

	const [majorInt, minorInt, _patchInt] = (smithyVersion ?? "")
		.split(".")
		.map((n) => Number.parseInt(n, 10) || 0);

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

function getSmithyDownloadUrl(
	platform: string,
	extension: string,
	smithyVersion?: string,
) {
	const GITHUB_RELEASES_BASE = "https://github.com/smithy-lang/smithy/releases";

	const baseDownloadUrl = smithyVersion
		? `${GITHUB_RELEASES_BASE}/download/${smithyVersion}`
		: `${GITHUB_RELEASES_BASE}/latest/download`;

	const platformName = platform === "win32" ? "windows" : platform;
	const arch = getArchitecture();

	return `${baseDownloadUrl}/smithy-cli-${platformName}-${arch}.${extension}`;
}

async function action() {
	const smithyVersion = core.getInput("version", {
		required: false,
		trimWhitespace: true,
	});

	core.getInput("smithy-build", {
		required: false,
		trimWhitespace: true,
	});

	const platform = os.platform();

	const { extension, extract } = getExtensionAndFunction(smithyVersion);

	try {
		const downloadUrl = getSmithyDownloadUrl(
			platform,
			extension,
			smithyVersion,
		);
		core.info(`Retrieve Smithy CLI from ${downloadUrl}`);

		const smithyArchivePath = await downloadTool(downloadUrl);

		let extractedSmithyFolder = await extract(smithyArchivePath);

		const dirs = fs.readdirSync(extractedSmithyFolder);

		if (dirs.length === 1) {
			extractedSmithyFolder = path.join(extractedSmithyFolder, dirs[0]);
		}

		// if (smithyBuildPath) {
		// 	await restore(smithyBuildPath);
		// }

		core.addPath(path.join(extractedSmithyFolder, "bin"));
		core.setOutput("SMITHY_PATH", extractedSmithyFolder);
	} catch (error) {
		if (error instanceof Error) core.setFailed(error.message);
	}
}

action();
