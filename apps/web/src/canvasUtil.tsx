import html2canvas from 'html2canvas';

export const parseDivToCanvas = (element: HTMLDivElement) =>
  html2canvas(element, { allowTaint: true }).then((canvas) => canvas);

export const downloadCanvas = (
  canvas: HTMLCanvasElement,
  imageName: string,
) => {
  const link = document.createElement('a');
  link.href = canvas.toDataURL('image/png');
  link.download = `${imageName}.png`;
  link.click();
  link.remove();
  canvas.remove();
};
