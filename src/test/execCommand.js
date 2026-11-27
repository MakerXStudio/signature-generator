// jsdom has no document.execCommand. The stub records what the copy helpers in
// src/util select: the textarea value for text, the node's innerHTML for HTML.
export const stubExecCommand = () => {
  const original = Object.getOwnPropertyDescriptor(document, 'execCommand');
  const copies = [];

  Object.defineProperty(document, 'execCommand', {
    configurable: true,
    writable: true,
    value: (command) => {
      if (command !== 'copy') throw new Error(`Unexpected command ${command}`);
      const active = document.body.lastElementChild;
      if (active && active.tagName === 'TEXTAREA') {
        copies.push(active.value);
        return true;
      }
      const range = window.getSelection().getRangeAt(0);
      copies.push(range.startContainer.childNodes[range.startOffset].innerHTML);
      return true;
    },
  });

  const restore = () => {
    if (original) {
      Object.defineProperty(document, 'execCommand', original);
    } else {
      delete document.execCommand;
    }
  };

  return { copies, restore };
};
