export const copyText = async (text: string): Promise<void> => {
  await navigator.clipboard.writeText(text);
};

export const copyHtml = async (html: string, text: string): Promise<void> => {
  await navigator.clipboard.write([
    new ClipboardItem({
      'text/html': new Blob([html], { type: 'text/html' }),
      'text/plain': new Blob([text], { type: 'text/plain' }),
    }),
  ]);
};
