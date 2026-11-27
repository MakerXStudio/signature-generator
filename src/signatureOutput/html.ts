import { createElement, type ComponentType } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import type { SignatureProps } from '../types';

// Returns the markup as the HTML parser normalizes it (for example the
// inserted <tbody>), which is what email clients receive on paste.
export const renderSignatureHtml = (
  Component: ComponentType<SignatureProps>,
  props: SignatureProps,
): string => {
  const template = document.createElement('template');
  template.innerHTML = renderToStaticMarkup(createElement(Component, props));
  // React 19 prepends a preload link for each <img>; they must not be pasted.
  template.content
    .querySelectorAll('link[rel="preload"]')
    .forEach((link) => link.remove());
  return template.innerHTML;
};
