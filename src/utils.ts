import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import * as cache from "@actions/cache";
import * as core from "@actions/core";
import * as glob from "@actions/glob";

enum State {
	HASH = "HASH",
	PRIMARY_KEY = "PRIMARY_KEY",
	MATCHED_KEY = "MATCHED_KEY",
}

const CACHE_KEY_PREFIX = "Smithy";
const SMITHY_M2_CACHE_PATHS = [
	path.join(os.homedir(), ".m2", "repository", "software", "amazon", "smithy"),
];

export async function computeCacheKey(smithyBuildPath: string) {
	const architecture = getArchitecture();
	const smithyBuild = JSON.parse(fs.readFileSync(smithyBuildPath).toString());
	fs.writeFileSync("smithy-lock.json", JSON.stringify(smithyBuild.maven));
	const hash = await glob.hashFiles("smithy-lock.json");
	return `${CACHE_KEY_PREFIX}-${process.env.RUNNER_OS}-${architecture}-${hash}`;
}

export async function restore(smithyBuildPath: string) {
	const primaryKey = await computeCacheKey(smithyBuildPath);
	core.saveState(State.PRIMARY_KEY, primaryKey);
	const matchedKey = await cache.restoreCache(
		SMITHY_M2_CACHE_PATHS,
		primaryKey,
	);
	if (matchedKey) {
		core.saveState(State.MATCHED_KEY, matchedKey);
		core.setOutput("cache-hit", matchedKey === primaryKey);
		core.info(`Cache restored from key: ${matchedKey}`);
	} else {
		core.setOutput("cache-hit", false);
		core.info("cache is not found");
	}
}

export async function save() {
	const matchedKey = core.getState(State.MATCHED_KEY);
	const primaryKey = core.getState(State.PRIMARY_KEY);
	core.info(`Primary key : ${primaryKey}`);

	if (!primaryKey) {
		core.info("Error retrieving key from state.");
		return;
	}
	if (matchedKey === primaryKey) {
		// no change in target directories
		core.info(
			`Cache hit occurred on the primary key ${primaryKey}, not saving cache.`,
		);
		return;
	}
	try {
		core.info("Saving cache");
		await cache.saveCache(SMITHY_M2_CACHE_PATHS, primaryKey);
		core.info(`Cache saved with the key: ${primaryKey}`);
	} catch (error) {
		// @ts-expect-error
		core.error(error.message);
		// @ts-expect-error
		if (error.name === cache.ReserveCacheError.name) {
			// @ts-expect-error
			core.info(error.message);
		}
	}
}

export function getArchitecture() {
	const platform = os.platform();
	const architecture = os.arch();
	switch (platform) {
		case "darwin":
		case "linux":
			if (architecture.startsWith("x")) {
				return "x86_64";
			}
			return "aarch64";

		case "win32":
			return "x64";
	}
}
