// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "\n.connection_container\n{\n    pointer-events: none;\n}\n\n.connection_line_background\n{\n    fill: transparent;\n    stroke: transparent;\n    stroke-opacity: 0.3;\n}\n\n.connection_line\n{\n    fill: transparent;\n    stroke: black;\n}\n\n.connection_end\n{\n    fill: black;\n}\n\n\n\n.connection_line_background.mouseable, .connection_end.mouseable\n{\n    cursor: pointer;\n    pointer-events: stroke;\n}\n.graph_background_pointer_down .connection_line_background.mouseable, .graph_background_pointer_down .connection_end.mouseable\n{\n    cursor: inherit;\n    pointer-events: none;\n}\n\n\n\n.connection_line_background.hovered\n{\n    stroke: orange;\n}\n.connection_line_background.highlighted\n{\n    stroke: blue;\n    stroke-opacity: 0.2;\n}\n\n.connection_line.hovered\n{\n    stroke: blue;\n    /* stroke-width: 3px; */\n    /* stroke-dasharray: 6px 3px; */\n    stroke-opacity: 1 !important;\n    filter: inherit !important;\n}\n\n.connection_end.hovered\n{\n    stroke: blue;\n    fill: blue;\n    fill-opacity: 1 !important;\n    stroke-opacity: 1 !important;\n}\n\n/*\n.connection_line.highlighted\n{\n    stroke: blue;\n}\n.connection_end.highlighted\n{\n    fill: blue;\n} */\n\n\n\n.connection_end.noop_end\n{\n    stroke: black;\n}\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}