#!/usr/bin/env node
const { main: mainFn } = require('../index');
mainFn(process.argv.slice(2));
