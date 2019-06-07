const { exec } = require('child_process');
const { join } = require('path');
const { readFileSync } = require('fs');
const { jsmin } = require('./jsmin');
const install_run_1 = require("./install-run");

const rushJsonFolder = install_run_1.findRushJsonFolder();
const RUSH_JSON = join(rushJsonFolder, 'rush.json');

const rushConfigContent = readFileSync(RUSH_JSON, { encoding: 'UTF-8' });
const validRushJson = jsmin(rushConfigContent);
const rushConfig = JSON.parse(validRushJson);

console.log(rushConfig.projects);

rushConfig.projects.forEach(({ packageName, projectFolder}) => {
  console.log(`Starting ${join(rushJsonFolder, projectFolder)}...`);

  const packageJsonPath = join(rushJsonFolder, projectFolder, 'package.json');
  const packageContent = readFileSync(packageJsonPath, 'utf-8');
  const packageConfig = JSON.parse(packageContent);
  const startScript = packageConfig.scripts.start;
  if (!startScript) {
    console.log('No start script, skipping...');
  } else {
    console.log(`Executing: ${startScript} in ${join(rushJsonFolder, projectFolder)}`);
    exec(`start npm start`, {
      cwd: join(rushJsonFolder, projectFolder)
    })
  }
});

console.log('Done');
setTimeout(() => {
  process.exit(0);
}, 500);