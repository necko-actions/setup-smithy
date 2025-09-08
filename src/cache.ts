import * as core from "@actions/core";
import { save } from "./utils";

async function cleanup() {
	const smithyBuildPath = core.getInput("smithy-build", {
		required: false,
		trimWhitespace: true,
	});

	if (smithyBuildPath) {
		core.info("Save cache");
		await save();
	}
}

cleanup();
