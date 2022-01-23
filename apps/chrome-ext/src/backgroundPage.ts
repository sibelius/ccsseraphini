import { browser } from 'webextension-polyfill-ts';

// TODO - check if we need some background work
chrome.runtime.onInstalled.addListener(function () {
  chrome.tabs.create({ url: 'https://google.com' });
});

