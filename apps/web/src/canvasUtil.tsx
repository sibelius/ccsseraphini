import html2canvas from 'html2canvas';

export const exportAsImage = async (
  element: HTMLDivElement,
  imageFileName: string,
) => {
  const canvas = await html2canvas(element, {
    allowTaint: true,
    useCORS: true,
  });
  const image = canvas.toDataURL('image/png', 1.0);

  downloadImage(image, imageFileName);
};

const downloadImage = (blob: string, fileName: string) => {
  const fakeLink = window.document.createElement('a');
  fakeLink.setAttribute('style', 'display:none;');
  fakeLink.download = fileName;

  fakeLink.href = blob;

  document.body.appendChild(fakeLink);
  fakeLink.click();
  document.body.removeChild(fakeLink);

  fakeLink.remove();
};

export default exportAsImage;
