import { ocktokit } from './github/client';

export const resumeToFile = async (data: string, filename: string) => {
  try {
    const owner = 'EmanuelCampos';
    const repo = 'ccseraphini-daily-resume';
    const path = `files/${filename}.md`;
    const message = 'Resume from the day';
    const content = Buffer.from(data).toString('base64');

    // Cria ou atualiza o arquivo
    const response = await ocktokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path,
      message,
      content,
    });
    console.log(`File ${path} added succesfully`);
    return response;
  } catch (err) {
    console.error(`Error when adding the archive ${err}`);
    throw err;
  }
};
