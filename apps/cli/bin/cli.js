#!/usr/bin/env node
const pkg = require('../package.json');
const { showErrorMessage, color } = require('../index');
const open = require('open');
const yargs = require('yargs')(process.argv.slice(2))
  .usage(`Usage: ${pkg.name} [question]`)
  .example(
    `npx ${pkg.name} "How can I learn Relay?"`,
    'Open a tab in your default browser with your doubt tagging the sseraphini',
  )
  .version(color(`${pkg.name} ${pkg.version}`, 'green'))
  .alias('v', 'version')
  .help('h')
  .alias('h', 'help');

async function main() {
  // If the user doesn't type any argument shows the help message.
  if (yargs.argv._.length === 0 && Object.keys(yargs.argv)[1] === '$0') {
    return yargs.showHelp();
  }

  // If the user types an invalid argument shows the error message.
  if (Object.keys(yargs.argv)[1] !== '$0') {
    return showErrorMessage(Object.keys(yargs.argv)[1]);
  }

  // If the user types a message opens the default browser with the
  // message ready to tweet.
  return await open(
    `https://twitter.com/intent/tweet?text=${yargs.argv._}%0Acc%20%40sseraphini`,
  );
}

main();
