## cc @sseraphini Chrome Extension

Base code for Chrome Extension

**Getting Started**

Run the following commands to install dependencies and start developing

```bash
pnpm && pnpm dev
```

**Scripts**

- `pnpm dev` - run `webpack` in `watch` mode
- `pnpm storybook` - runs the Storybook server
- `pnpm build` - builds the production-ready unpacked extension
- `pnpm test -u` - runs Jest + updates test snapshots
- `pnpm lint` - runs EsLint
- `pnpm prettify` - runs Prettier

<details>
  <summary>Loading the extension in Google Chrome</summary>

In [Google Chrome](https://www.google.com/chrome/), open up [chrome://extensions](chrome://extensions) in a new tab. Make sure the `Developer Mode` checkbox in the upper-right corner is turned on. Click `Load unpacked` and select the `dist` directory in this repository - your extension should now be loaded.

![Installed Extension in Google Chrome](https://i.imgur.com/ORuHbDR.png 'Installed Extension in Google Chrome')

</details>

<details>
  <summary>Loading the extension in Brave</summary>

In [Brave](https://brave.com/), open up [brave://extensions](brave://extensions) in a new tab. Make sure the `Developer Mode` checkbox in the upper-right corner is turned on. Click `Load unpacked` and select the `dist` directory in this repository - your extension should now be loaded.

![Installed Extension in Brave](https://i.imgur.com/z8lW02m.png 'Installed Extension in Brave')

</details>

<details>
  <summary>Loading the extension in Mozilla Firefox</summary>

In [Mozilla Firefox](https://www.mozilla.org/en-US/firefox/new/), open up the [about:debugging](about:debugging) page in a new tab. Click the `Load Temporary Add-on...` button and select the `manfiest.json` from the `dist` directory in this repository - your extension should now be loaded.

![Installed Extension in Mozilla Firefox](https://i.imgur.com/gO2Lrb5.png 'Installed Extension in Mozilla Firefox')

</details>

**Misc. References**

- [Chrome Extension Developer Guide](https://developer.chrome.com/extensions/devguide)
- [Firefox Extension Developer Guide](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension)
