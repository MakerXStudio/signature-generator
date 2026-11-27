// jsdom has no document.execCommand. This defines a stub that records what
// the app's copy helpers select: the textarea's value for text copies, or the
// selected container's innerHTML for HTML copies. Returns the captured list
// and a restore function that puts the original property back.
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
