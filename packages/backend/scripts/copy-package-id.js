#!/usr/bin/env node

const { promises } = require("node:fs");
const { homedir } = require("node:os");
const path = require("node:path");
const EnvFileWriter = require("env-file-rw").default;

const DEPLOYED_MODULE_NAME = "greeting";

const main = async () => {
  const network = getNetworkFromArgs();
  const sourceFile = sourceFilePath(network, DEPLOYED_MODULE_NAME);
  const targetFile = targetFilePath();
  const packageId = await readPackageId(sourceFile);
  await createFileIfNecessary(targetFile);
  await setEnvVar(
    targetFile,
    `VITE_${network.toUpperCase()}_CONTRACT_PACKAGE_ID`,
    packageId
  );
};

const sourceFilePath = (network, deployedModuleName) => {
  return path.join(
    homedir(),
    `/suibase/workdirs/${network}/published-data/${deployedModuleName}/most-recent/package-id.json`
  );
};

const targetFilePath = () => {
  return path.join(process.cwd(), "../frontend/.env.local");
};

const getNetworkFromArgs = () => {
  const arg = process.argv.slice(2);
  return arg[0] === "-n" ? arg[1] : "localnet";
};

const readPackageId = async (sourceFile) => {
  const data = await promises.readFile(sourceFile, "utf8");
  return JSON.parse(data)[0];
};

const createFileIfNecessary = async (filePath) => {
  try {
    await promises.writeFile(filePath, "", { flag: "wx" });
  } catch {}
};

const setEnvVar = async (envFilePath, name, value) => {
  const envFileWriter = new EnvFileWriter(envFilePath, false);
  await envFileWriter.parse();
  envFileWriter.set(name, value);
  await envFileWriter.save();
};

main().catch((e) => {
  console.error(e);
});
