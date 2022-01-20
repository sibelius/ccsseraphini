#!/usr/bin/env node
const open = require('open');
const yargs = require('yargs/yargs');
const chalk = require('chalk');

const name = chalk.green('ccsseraphini');
const title = `${name} is a CLI to solve all your doubts about everything.`;
const subtitle = `${chalk.yellow('Usage  :')} npx ccsseraphini [options]
${chalk.yellow('Example:')} npx ccsseraphini -t "How can I learn Relay?"`;

const argv = yargs(process.argv.slice(2))
  .usage(`${title}\n\n${subtitle}`)
  .help('help')
  .alias('help', 'h')
  .version()
  .alias('version', 'V')
  .options({
    tweet: {
      alias: 't',
      description: 'Write your tweet concept/question',
      required: true,
    },
  }).argv;

if (argv.tweet) {
  open(
    `https://twitter.com/intent/tweet?text=${argv.tweet}%0Acc%20%40sseraphini`,
  );
}
