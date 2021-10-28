// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "#graph_container {\n  flex-grow: 1;\n  flex-shrink: 1;\n  cursor: move;\n  overflow: hidden;\n}\n#graph_container.squared_background {\n  background-image: linear-gradient(to right, #EEE 1px, transparent 1px), linear-gradient(to bottom, #EEE 1px, transparent 1px);\n}\n#graph_container.graph_background_pointer_down #graph_lowest_elements_container {\n  pointer-events: none;\n}\n\n/* styles from here on are copies as-is because I don't fully know the scope/intent/etc */\n#graph_visuals_container {\n  overflow: visible;\n  position: relative;\n  transform-origin: left top;\n  height: 0;\n  width: 0;\n}\n\n#graph_container svg {\n  overflow: visible;\n  pointer-events: none;\n}\n\n.visual {\n  position: absolute;\n  width: 200px;\n  cursor: pointer;\n}\n\n.node.mouseable {\n  cursor: pointer;\n}\n\n.node .node_main_content {\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n  user-select: none;\n  border: thin solid #555;\n  border-radius: 4px;\n}\n\n.node.focused {\n  z-index: 100;\n}\n\n.highlighting_connection_lines .connection_line {\n  stroke: #BBB;\n}\n\n.highlighting_connection_lines .connection_end {\n  fill: #BBB;\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}