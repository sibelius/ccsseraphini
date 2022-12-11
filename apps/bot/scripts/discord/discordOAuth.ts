import 'isomorphic-fetch';
import open from 'open';
import { isMainScript } from '../isMainScript';
import { OAUTH_URI } from '../../src/discord/oauth';

const run = async () => {
  await open(OAUTH_URI);
};

(async () => {
  if (!isMainScript(require, module)) {
    return;
  }
  try {
    await run();
  } catch (err) {
    // eslint-disable-next-line
    console.log('err: ', err);
    process.exit(1);
  }
  process.exit(0);
})();
