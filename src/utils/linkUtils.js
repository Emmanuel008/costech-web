import React from 'react';

const URL_REGEX = /(https?:\/\/[^\s<>"']+)/g;
const TRAILING_PUNCTUATION_REGEX = /[.,;:!?)]*$/;

const splitTrailingPunctuation = (value) => {
  const trailing = value.match(TRAILING_PUNCTUATION_REGEX)?.[0] || '';

  if (!trailing) {
    return [value, ''];
  }

  return [value.slice(0, -trailing.length), trailing];
};

export const linkifyText = (value, keyPrefix = 'linkified-text') => {
  const text = String(value || '');

  return text.split('\n').flatMap((line, lineIndex) => {
    const parts = line.split(URL_REGEX);
    const lineNodes = parts.map((part, index) => {
      if (!part.match(/^https?:\/\//)) {
        return part;
      }

      const [url, trailing] = splitTrailingPunctuation(part);

      return (
        <React.Fragment key={`${keyPrefix}-${lineIndex}-${index}`}>
          <a href={url} target="_blank" rel="noopener noreferrer">
            {url}
          </a>
          {trailing}
        </React.Fragment>
      );
    });

    if (lineIndex === 0) {
      return lineNodes;
    }

    return [<br key={`${keyPrefix}-line-${lineIndex}`} />, ...lineNodes];
  });
};

export const linkifyHtml = (value) => {
  const html = String(value || '');

  if (typeof window === 'undefined' || typeof window.DOMParser === 'undefined') {
    return html;
  }

  const parser = new window.DOMParser();
  const documentNode = parser.parseFromString(html, 'text/html');
  const blockedTags = ['script', 'style', 'iframe', 'object', 'embed'];

  blockedTags.forEach((tag) => {
    documentNode.body.querySelectorAll(tag).forEach((element) => element.remove());
  });

  documentNode.body.querySelectorAll('*').forEach((element) => {
    Array.from(element.attributes).forEach((attribute) => {
      const name = attribute.name.toLowerCase();
      const valueText = attribute.value.trim().toLowerCase();
      const unsafeProtocol = ['java', 'script:'].join('');

      if (name.startsWith('on') || valueText.startsWith(unsafeProtocol)) {
        element.removeAttribute(attribute.name);
      }
    });

    if (element.tagName.toLowerCase() === 'a') {
      element.setAttribute('target', '_blank');
      element.setAttribute('rel', 'noopener noreferrer');
    }
  });

  const walker = documentNode.createTreeWalker(
    documentNode.body,
    window.NodeFilter.SHOW_TEXT
  );
  const textNodes = [];

  while (walker.nextNode()) {
    const parentTag = walker.currentNode.parentElement?.tagName.toLowerCase();

    if (parentTag !== 'a') {
      textNodes.push(walker.currentNode);
    }
  }

  textNodes.forEach((node) => {
    const text = node.nodeValue || '';

    if (!URL_REGEX.test(text)) {
      URL_REGEX.lastIndex = 0;
      return;
    }

    URL_REGEX.lastIndex = 0;
    const fragment = documentNode.createDocumentFragment();
    let lastIndex = 0;

    text.replace(URL_REGEX, (match, ...args) => {
      const offset = args[args.length - 2];

      if (offset > lastIndex) {
        fragment.appendChild(documentNode.createTextNode(text.slice(lastIndex, offset)));
      }

      const [url, trailing] = splitTrailingPunctuation(match);
      const anchor = documentNode.createElement('a');
      anchor.href = url;
      anchor.textContent = url;
      anchor.target = '_blank';
      anchor.rel = 'noopener noreferrer';
      fragment.appendChild(anchor);

      if (trailing) {
        fragment.appendChild(documentNode.createTextNode(trailing));
      }

      lastIndex = offset + match.length;
      return match;
    });

    if (lastIndex < text.length) {
      fragment.appendChild(documentNode.createTextNode(text.slice(lastIndex)));
    }

    node.parentNode.replaceChild(fragment, node);
  });

  return documentNode.body.innerHTML;
};
