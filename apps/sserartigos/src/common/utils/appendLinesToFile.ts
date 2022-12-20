export const appendLinesToFile = (
  oldFileContent: string,
  contentToAppend: string[],
) => {
  const fileBuffer = atob(oldFileContent);

  const newFileBuffer = contentToAppend.reduce((acc, currentValue) => {
    return acc + '\n' + currentValue;
  }, fileBuffer);

  return Buffer.from(newFileBuffer).toString('base64');
};
