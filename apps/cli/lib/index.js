'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
const opn = require('open');
const yargs = require('yargs');
const pkg = require('../package.json');
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
  console.log(`${color('Error', 'red')}: Found argument '${color(
    arg,
    'red',
  )}' which wasn't expected, or isn't valid in this context!

${color('Usage:', 'yellow')} npx ${pkg.name} [question]

For more information try ${color('--help', 'green')} or ${color(
    '--h',
    'green',
  )}`);
}
function main(args) {
  return __awaiter(this, void 0, void 0, function* () {
    const cli = yargs(args)
      .usage(`Usage: ${pkg.name} [question]`)
      .example(
        `npx ${pkg.name} "How can I learn Relay?"`,
        'Open a tab in your default browser with your doubt tagging the sseraphini',
      )
      .alias('v', 'version')
      .alias('h', 'help');
    // If the user doesn't type any argument shows the help message.
    if (cli.argv._.length === 0 && Object.keys(cli.argv)[1] === '$0') {
      return cli.showHelp();
    }
    // If the user types an invalid argument shows the error message.
    if (Object.keys(cli.argv)[1] !== '$0') {
      return showErrorMessage(Object.keys(cli.argv)[1]);
    }
    // If the user types a message opens the default browser with the
    // message ready to tweet.
    const text = `${cli.argv._} cc @sseraphini`;
    return yield opn(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,
    );
  });
}
module.exports = {
  main,
};
