const pkg = require('./package.json');

function color(str, color) {
  const reset = '\x1b[0m';

  if (color === 'red') {
    return `${'\x1b[31m' + str + reset}`;
  }

  if (color === 'yellow') {
    return `${'\x1b[33m' + str + reset}`;
  }

  if (color === 'green') {
    return `${'\x1b[32m' + str + reset}`;
  }

  return `${str + reset}`;
}

function showHelp() {
  console.log(
    `${color(pkg.name, 'green')} ${color(pkg.version, 'green')}
${pkg.description}

${color('USAGE', 'yellow')}:
  npx ccsseraphini [QUESTION]

${color('EXAMPLE', 'yellow')}:
  npx ccsseraphini "How can I learn Relay?"

${color('OPTIONS', 'yellow')}:
  -h, --help                           Print this help message.
  -V, --version                        Show version information.`,
  );
}

function showVersion() {
  console.log(pkg.name, pkg.version);
}

function showErrorMsg(msg) {
  console.log(
    `${color(
      'Error',
      'red',
    )}: Found argument '${msg}' which wasn't expected, or isn't valid in this context!

${color('USAGE', 'yellow')}:
  npx ccsseraphini [QUESTION]

For more information try --help or -h`,
  );
}

module.exports = {
  showHelp,
  showVersion,
  showErrorMsg,
};
