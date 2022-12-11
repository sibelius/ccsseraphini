export const isMainScript = (require, module) => {
  if (!module.parent) {
    return true;
  }

  if (process.env.DEBUG === 'true') {
    // eslint-disable-next-line
    console.log('not main script, check your script code');
  }

  return false;
};
