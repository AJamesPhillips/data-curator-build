// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "\n#modal_background\n{\n    position: fixed;\n    z-index: 1;\n    left: 0;\n    right: 0;\n    top: 0;\n    bottom: 0;\n    background-color: rgba(200, 200, 200, 0.3);\n}\n\n#modal_container\n{\n    position: fixed;\n    left: 50%;\n    top: 40%;\n    width: 600px;\n    margin-left: -300px;\n    height: 250px;\n    margin-top: -125px;\n    background-color: white;\n    border: thin solid #777;\n    /* overflow: scroll; */\n}\n\n#modal_close\n{\n    position: absolute;\n    right: 5px;\n    top: 5px;\n    width: 30px;\n    height: 22px;\n    text-align: center;\n    border-radius: 2px;\n    border: thin solid #777;\n    cursor: pointer;\n}\n#modal_close span\n{\n    vertical-align: middle; /* Does not seem to work */\n}\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}