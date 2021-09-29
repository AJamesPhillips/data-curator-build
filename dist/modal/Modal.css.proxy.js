// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "\n#modal_background\n{\n    position: fixed;\n    z-index: 1;\n    left: 0;\n    right: 0;\n    top: 0;\n    bottom: 0;\n    background-color: rgba(200, 200, 200, 0.7);\n}\n\n#modal_container\n{\n    position: fixed;\n    left: 50%;\n    top: 40%;\n    background-color: white;\n    border: thin solid #777;\n\n    overflow-y: scroll;\n}\n\n\n.small_modal #modal_container\n{\n    width: 42%;\n    margin-left: -21%;\n    height: 30%;\n    margin-top: -10%;\n}\n\n.medium_modal #modal_container\n{\n    width: 62%;\n    margin-left: -31%;\n    height: 64%;\n    margin-top: -12%;\n}\n\n.large_modal #modal_container\n{\n    width: 88%;\n    margin-left: -44%;\n    height: 80%;\n    margin-top: -14%;\n}\n\n#modal_close\n{\n    position: absolute;\n    right: 5px;\n    top: 5px;\n    width: 30px;\n    height: 29px;\n    text-align: center;\n    border-radius: 2px;\n    border: thin solid #777;\n    cursor: pointer;\n}\n#modal_close span\n{\n    vertical-align: middle; /* Does not seem to work */\n}\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}