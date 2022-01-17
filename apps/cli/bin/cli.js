#!/usr/bin/env node

const open = require('open');
const { showHelp, showVersion, showErrorMsg } = require('../index');

async function main() {
  const message = process.argv[2];

  if (message === undefined || message === '-h' || message === '--help') {
    showHelp();
  } else if (message === '-v' || message === '--version') {
    showVersion();
  } else if (
    (message.charAt(0) === '-' && message !== '-h') ||
    (message.charAt(0) === '-' && message !== '--help') ||
    (message.charAt(0) === '-' && message !== '-v') ||
    (message.charAt(0) === '-' && message !== '--version')
  ) {
    showErrorMsg(message);
  } else {
    return await open(
      `https://twitter.com/intent/tweet?text=${message}%0Acc%20%40sseraphini`,
    );
  }
}

main();
