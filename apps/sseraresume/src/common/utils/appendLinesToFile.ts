/**
 * gets the file content and returns a base64 string with the appended lines
 */
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
