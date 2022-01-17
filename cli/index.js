const pkg = require('./package.json');

function color(str, color) {
  const reset = '\x1b[0m';
  const colors = {
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    green: '\x1b[32m',
  };

  const resetedStr = `${str}${reset}`;
  return `${colors[color]}${resetedStr}`;
}

function showHelp() {
  console.log(
    `${color(pkg.name, 'green')} ${color(pkg.version, 'green')}
${pkg.description}

${color('USAGE:', 'yellow')}
  npx ccsseraphini [QUESTION]

${color('EXAMPLE:', 'yellow')}
  npx ccsseraphini "How can I learn Relay?"

${color('OPTIONS:', 'yellow')}
  ${color('-h', 'green')}, ${color(
      '--help',
      'green',
    )}      Print this help message.
  ${color('-v', 'green')}, ${color(
      '--version',
      'green',
    )}   Show version information.`,
  );
}

function showVersion() {
  console.log(color(`${pkg.name} ${pkg.version}`, 'green'));
}

function showErrorMessage(arg) {
  console.log(
    `${color('Error', 'red')}: Found argument '${color(
      arg,
      'red',
    )}' which wasn't expected, or isn't valid in this context!

${color('USAGE', 'yellow')}:
  npx ccsseraphini [QUESTION]

For more information try ${color('--help', 'green')} or ${color(
      '--h',
      'green',
    )}`,
  );
}

module.exports = {
  showHelp,
  showVersion,
  showErrorMessage,
};
