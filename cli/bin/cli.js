#!/usr/bin/env node

const open = require('open');
const { showHelp, showVersion, showErrorMessage } = require('../index');

async function main() {
  const message = process.argv[2];

  const validOptions = ['-v', '--version', '-h', ' --help'];

  if (message.charAt(0) === '-' && !validOptions.includes(message)) {
    return showErrorMessage(message);
  }

  switch (message.toLowerCase()) {
    case '-v':
    case '--version':
      showVersion();
      break;

    case '-h':
    case '--help':
      showHelp();
      break;

    default:
      await open(
        `https://twitter.com/intent/tweet?text=${message}%0Acc%20%40sseraphini`,
      );
      break;
  }
}

main();