#!/usr/bin/env node

const open = require('open');
const { showHelp, showVersion, showErrorMsg } = require('../index');

async function main() {
  const validFlags = ['-v', '--version', '-h', ' --help'];
  const message = process.argv[2];

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
  }
}

main();
