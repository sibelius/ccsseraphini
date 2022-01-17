#!/usr/bin/env node

const open = require('open');
const { showHelp, showVersion, showErrorMessage } = require('../index');

async function main() {
  const validFlags = ['-v', '--version', '-h', ' --help'];
  const message = process.argv[2];

<<<<<<< HEAD
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
=======
  if (
    message === undefined ||
    message.toLowerCase() === '-h' ||
    message.toLowerCase() === '--help'
  ) {
    showHelp();
  } else if (
    message.toLowerCase() === '-v' ||
    message.toLowerCase() === '--version'
  ) {
    showVersion();
  } else if (message.charAt(0) === '-' && !validFlags.includes(message)) {
    showErrorMsg(message);
  } else {
    return await open(
      `https://twitter.com/intent/tweet?text=${message}%0Acc%20%40sseraphini`,
    );
>>>>>>> 84b0960 (refactor: suggestions for improvements to the cli code done)
  }
}

main();