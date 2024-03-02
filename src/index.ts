import * as os from "os";
import * as path from "path";
import * as core from "@actions/core";
import { downloadTool, extractTar } from "@actions/tool-cache";
import { getArchitecture, restore } from "./utils";

async function action() {
	try {
		const smithyVersion = core.getInput("version", {
			required: true,
			trimWhitespace: true,
		});

		const smithyBuildPath = core.getInput("smithy-build", {
			required: false,
			trimWhitespace: true,
		});

		const platform = os.platform();

		const SMITHY_RELEASE_URL = `https://github.com/awslabs/smithy/releases/download/${smithyVersion}/smithy-cli-${
			platform === "win32" ? "windows" : platform
		}-${getArchitecture()}.tar.gz`;

		core.info(`Retrieve Smithy CLI from ${SMITHY_RELEASE_URL}`);

		const smithyTarGzPath = await downloadTool(SMITHY_RELEASE_URL);

		const extractedSmithyFolder = await extractTar(smithyTarGzPath);

		if (smithyBuildPath) {
			await restore(smithyBuildPath);
		}

		core.addPath(path.join(extractedSmithyFolder, "bin"));
	} catch (error) {
		if (error instanceof Error) core.setFailed(error.message);
	}
}

action();
