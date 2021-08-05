// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".fake_text_input\n{\n    height: 15px;\n    width: 147px;\n    background-color: white;\n    border: thin solid #777;\n    border-radius: 3px;\n    padding: 2px 2px;\n    font-family: Arial;\n    font-size: 13.333px;\n    overflow: hidden;\n    white-space: nowrap;\n}\n.fake_text_input div\n{\n    text-overflow: ellipsis;\n    overflow: hidden;\n    vertical-align: middle;\n}\n\n.fake_text_input.empty\n{\n    color: #666;\n}\n\n.fake_text_input.disabled\n{\n    color: rgb(84, 84, 84);\n    background-color: rgba(239, 239, 239, 0.3);\n    border-color: rgba(118, 118, 118, 0.3);\n}\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}