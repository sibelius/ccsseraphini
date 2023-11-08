import { GitHubResponseData, GitRepoInfo } from '../../types';
import { ocktokit } from '../client';

export const getFile = async (
  repoInfo: GitRepoInfo,
): Promise<GitHubResponseData> => {
  const { data } = await ocktokit.repos.getContent({
    owner: repoInfo.owner,
    repo: repoInfo.repo,
    ref: repoInfo.branch,
    path: repoInfo.path,
  });

  return data as unknown as GitHubResponseData;
};
