// Chromium inlines computed styles into copied HTML. Computed widths depend on
// how each OS rasterizes Helvetica and Arial, so every px `width` value is
// replaced with `width:<px>`: presence is still checked, the value is not.
// Frozen once the milestone 1 Linux check passed; do not change it.
export const normalizeClipboardHtml = (html) =>
  html.replace(/(?<![\w-])width:\s*-?[\d.]+px/g, 'width:<px>');
