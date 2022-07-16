#!/usr/bin/env node

const { execSync } = require('child_process');
const yargs = require('yargs');

const runCommand = (command) => {
  try {
    execSync(`${command}`, { stdio: 'inherit' });
  } catch (error) {
    console.error(`Failed executing ${command} `, error);
    return false;
  }
  return true;
};

const repoName = yargs.argv[2];
const gitCheckoutCommand = `git clone --depth 1 https://github.com/rubemfsv/clean-react-app ${repoName}`;
const installDependenciesCommand = `cd ${repoName} && npm install`;

console.log(`Cloning the repository with the name ${repoName}`);

const checkedOut = runCommand(gitCheckoutCommand);
if (!checkedOut) process.exit(-1);

console.log(`Installing dependencies for ${repoName}`);

const installedDependencies = runCommand(installDependenciesCommand);
if (!installedDependencies) process.exit(-1);

console.log(
  'Congratulations! You are ready. Follow the following commands to start'
);

console.log(`cd ${repoName} && npm run dev`);
