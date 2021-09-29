// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".wcomponent_canvas_node .handles {\n  user-select: none;\n  position: absolute;\n  top: 0;\n  right: auto;\n  bottom: auto;\n  left: -24px;\n  font-size: 1em;\n  width: 25px;\n}\n\n.node_handle {\n  color: rgba(0, 0, 0, 0.3);\n  min-width: 1.5em;\n  border-radius: 3px;\n  transition: background-color 0.2s, color 0.2s;\n  cursor: pointer;\n}\n\n.node_handle:hover {\n  color: black;\n}\n\n.node_handle.movement {\n  cursor: move;\n}\n\n.node_handle.explore.has_nested_knowledge_view {\n  color: black;\n  /* Can not colour unicode characters */\n}\n.node_handle.explore.current_but_no_parent {\n  color: pink;\n}\n.node_handle.explore.current_but_no_parent:hover {\n  color: red;\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}