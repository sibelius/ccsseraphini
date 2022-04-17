/* eslint-disable @typescript-eslint/no-var-requires */
const withPlugins = require('next-compose-plugins');
const { withSentryConfig } = require('@sentry/nextjs');
const withPWA = require('next-pwa');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { dev }) => {
    config.module.rules.push({
      test: /\.test.js$/,
      loader: 'ignore-loader',
    });
    return config;
  },
};

const plugins = [
  [
    withPWA,
    {
      pwa: {
        dest: 'public',
        fallbacks: {
          image: '/static/fallback.png',
        },
      },
    },
  ],
];

if (process.env.NODE_ENV === 'production') {
  plugins.push([
    withSentryConfig,
    {
      sentry: {
        disableServerWebpackPlugin: true,
        disableClientWebpackPlugin: true,
      },
      publicRuntimeConfig: {
        dns: process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN,
      },
      silent: true,
      dryRun: true,
      // For all available options, see:
      // https://github.com/getsentry/sentry-webpack-plugin#options.
    },
  ]);
}

module.exports = withPlugins([...plugins], nextConfig);
