#!/usr/bin/env node
'use strict';
const { main: mainFn } = require('../index');
mainFn(process.argv.slice(2));
