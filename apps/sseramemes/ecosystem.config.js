/**
 * More details about ecosystem file:
 * https://pm2.keymetrics.io/docs/usage/application-declaration/
 */
module.exports = {
  apps: [
    {
      name: 'sseramemes',
      script: 'npm',
      args: 'start',
      /**
       * Add time to the logs
       */
      time: true,
      /**
       * Watch changes to "deploy" the bot
       */
      watch: true,
    },
  ],
};
