import { appendLinesToFile } from '../common/utils/appendLinesToFile';
import { gitRepoInfo as repoInfo, ocktokit } from './client';
import { getFile } from './services/getFile';

const commitChangedFile = async (commit: {
  newFile: string;
  commitMessage: string;
  commitSha: string;
}) => {
  await ocktokit.repos.createOrUpdateFileContents({
    ...repoInfo,
    message: commit.commitMessage,
    content: commit.newFile,
    sha: commit.commitSha,
    branch: repoInfo.branch,
  });
};

export const createCommitToZettelkastenFile = async (
  commitMessage: string,
  linesToAppend: string[],
) => {
  const file = await getFile(repoInfo);
  const newFile = appendLinesToFile(file.content, linesToAppend);
  const commitInfo = {
    newFile,
    commitMessage,
    commitSha: file.sha,
  };

  commitChangedFile(commitInfo)
    .then((_) => console.log('commited'))
    .catch((e) => console.error(e));
};
