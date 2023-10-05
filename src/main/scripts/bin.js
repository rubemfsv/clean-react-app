#!/usr/bin/env node

const fs = require('fs')
const { execSync } = require('child_process')

const runCommand = (command) => {
  try {
    execSync(`${command}`, { stdio: 'inherit' })
  } catch (error) {
    console.error(`Failed executing ${command} `, error)
    return false
  }
  return true
}

const authorName = process.argv[3]
const repoName = process.argv[2]

const gitCheckoutCommand = `git clone --depth 1 https://github.com/rubemfsv/clean-react-app ${repoName}`
const installDependenciesCommand = `cd ${repoName} && npm install`

console.log(`Cloning the repository with the name ${repoName}`)

const checkedOut = runCommand(gitCheckoutCommand)
if (!checkedOut) process.exit(-1)

console.log(`Installing dependencies for ${repoName}`)

const installedDependencies = runCommand(installDependenciesCommand)
if (!installedDependencies) process.exit(-1)

console.log(
  'Congratulations! You are ready. Follow the following commands to start'
)

console.log(`cd ${repoName} && npm run dev`)

console.log(`Author: ${authorName}`)

// Dynamically update package.json
const packageJsonPath = `${repoName}/package.json`

try {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))

  // Update package.json fields
  packageJson.name = repoName
  packageJson.author = authorName
  packageJson.version = '0.0.1'

  // Write the updated package.json back to the file
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))

  console.log('Updated package.json with dynamic values.')
} catch (error) {
  console.error('Failed to update package.json: ', error)
}

export { repoName, authorName }

