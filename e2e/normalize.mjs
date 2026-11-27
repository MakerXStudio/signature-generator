// Chromium inlines computed styles into copied HTML, and px widths vary with
// each OS's font rasterization. The e2e goldens depend on this exact output.
export const normalizeClipboardHtml = (html) =>
  html.replace(/(?<![\w-])width:\s*-?[\d.]+px/g, 'width:<px>');
