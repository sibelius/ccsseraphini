import { Octokit } from '@octokit/rest';
import { config } from '../config';

export const ocktokit = new Octokit({ auth: config.GITHUB_TOKEN });

export const gitRepoInfo = {
  owner: config.GIT_REPO_OWNER,
  repo: config.GIT_REPO_NAME,
  branch: config.GIT_REPO_BRANCH,
  path: config.ZETTELKASTEN_FILE_PATH,
};
