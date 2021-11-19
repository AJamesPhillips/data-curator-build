// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".connectable_canvas_node {\n  box-sizing: content-box;\n  width: 250px;\n}\n\n.connectable_canvas_node.node .node_main_content {\n  min-height: 36px;\n  white-space: normal;\n}\n\n.connection_terminal {\n  position: absolute;\n  background-color: white;\n  border: thin solid #555;\n  font-size: 9px;\n  text-align: center;\n  user-select: none;\n}\n\n.connection_terminal:hover {\n  box-shadow: 0 0 6px blue;\n  background-color: #3582f7;\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}