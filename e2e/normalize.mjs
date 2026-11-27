// Chromium inlines computed styles into copied HTML, and px widths vary with
// each OS's font rasterization. Only px `width` values are replaced, so a width
// appearing or disappearing still fails. Do not widen this: the e2e goldens
// were recorded with exactly this rule.
export const normalizeClipboardHtml = (html) =>
  html.replace(/(?<![\w-])width:\s*-?[\d.]+px/g, 'width:<px>');
