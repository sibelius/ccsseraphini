#!/usr/bin/env node

const open = require('open');
const { color, showHelp, showVersion, showErrorMsg } = require('../index');

async function main() {
  const validFlags = ['-v', '--version', '-h', ' --help'];
  const message = process.argv[2];

  if (message.length > 264) {
    return console.log(
      color('The maximum number of characters is 264!', 'red'),
    );
  }

  if (message.charAt(0) === '-' && !validFlags.includes(message)) {
    return showErrorMsg(message);
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
