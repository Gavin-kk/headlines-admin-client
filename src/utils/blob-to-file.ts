export const convertFile = (blob: Blob, fileName: string): File =>
  new window.File([blob], fileName || `${new window.Date().getTime()}.png`, {
    type: 'image/png',
  });
