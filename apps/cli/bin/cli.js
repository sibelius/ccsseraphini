#!/usr/bin/env node

const open = require('open');
const { showHelp, showVersion, showErrorMsg } = require('../index');

async function main() {
  const message = process.argv[2];

  if (message === undefined || message === '-h' || message === '--help') {
    return showHelp();
  }

  if (message === '-v' || message === '--version') {
    return showVersion();
  }

  if (
    (message.charAt(0) === '-' && message !== '-h')
    || (message.charAt(0) === '-' && message !== '--help')
    || (message.charAt(0) === '-' && message !== '-v')
    || (message.charAt(0) === '-' && message !== '--version')
  ) {
    return showErrorMsg(message);
  }

  return open(
    `https://twitter.com/intent/tweet?text=${message}%0Acc%20%40sseraphini`,
  );
}

main();
