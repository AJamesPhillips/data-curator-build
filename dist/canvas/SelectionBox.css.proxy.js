// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "\n\n.selection_box\n{\n    position: relative;\n    z-index: 3;\n    border-radius: 2px;\n    pointer-events: none;\n}\n\n.selection_box.color_blue\n{\n    border: 2px solid rgba(53, 50, 255, 0.65);\n    background-color: rgba(53, 50, 255, 0.2);\n}\n\n.selection_box.color_red\n{\n    border: 2px solid rgba(255, 53, 50, 0.65);\n    background-color: rgba(255, 53, 50, 0.2);\n}\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}