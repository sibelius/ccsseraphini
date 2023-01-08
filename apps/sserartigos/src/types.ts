import { Message, PartialMessage } from 'discord.js';

export type GitRepoInfo = {
  owner: string;
  repo: string;
  branch: string;
  path: string;
};

export type GitHubResponseData = {
  type: 'dir' | 'file' | 'submodule' | 'symlink';
  size: number;
  name: string;
  path: string;
  content?: string;
  sha: string;
  url: string;
  git_url: string;
  html_url: string;
  download_url: string;
};

export type DiscordMessage = Message<boolean> | PartialMessage;
