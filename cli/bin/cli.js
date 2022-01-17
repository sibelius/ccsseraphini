#!/usr/bin/env node

const open = require('open');
const { showHelp, showVersion, showErrorMessage } = require('../index');

async function main() {
  const message = process.argv[2];

  const validOptions = ['-v', '--version', '-h', ' --help'];
  const options = {
    help: ['-h', '--help', undefined],
    version: ['-v', '--version'],
  }

  if (
    options.help.includes(message?.toLowerCase())
  ) {
    showHelp();
  } else if (
    options.version.includes(message?.toLowerCase())
  ) {
    showVersion();
  } else if (message.charAt(0) === '-' && !validOptions.includes(message)) {
    showErrorMessage(message);
  } else {
    return await open(
      `https://twitter.com/intent/tweet?text=${message}%0Acc%20%40sseraphini`,
    );
  }
}

main();
