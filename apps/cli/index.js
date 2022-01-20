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

function showErrorMessage(arg) {
  console.log(
    `${color('Error', 'red')}: Found argument '${color(
      arg,
      'red',
    )}' which wasn't expected, or isn't valid in this context!

${color('Usage:', 'yellow')} npx ${pkg.name} [question]

For more information try ${color('--help', 'green')} or ${color(
      '--h',
      'green',
    )}`,
  );
}

module.exports = {
  color,
  showErrorMessage,
};
