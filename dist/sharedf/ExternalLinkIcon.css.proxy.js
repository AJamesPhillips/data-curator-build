// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "\n.external_link_icon\n{\n    /* Copied from: https://steemit.com%2Funicode%2F@steemit.com/unicode/@markgritter/why-did-unicode-reject-the-external-link-symbol */\n    content: '';\n    background-size: cover;\n    display: inline-block;\n    width: 0.6em;\n    height: 0.75em;\n    top: 0.05em;\n    position: relative;\n    left: 0.2em;\n    margin-right: 0.2em;\n    opacity: .5;\n    cursor: pointer;\n    background-image: url('data:image/svg+xml; utf8, <svg height=\"1024\" width=\"768\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M640 768H128V258L256 256V128H0v768h768V576H640V768zM384 128l128 128L320 448l128 128 192-192 128 128V128H384z\" fill=\"%23788187\"/></svg>');\n}\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}