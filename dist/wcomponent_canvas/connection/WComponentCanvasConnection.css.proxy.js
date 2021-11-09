// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".connection_container .connection_line, .connection_container .connection_end {\n  transition: opacity 0.25s ease-in-out;\n}\n.connection_container.connection_type_relation_link .connection_line {\n  stroke-dasharray: 2 10;\n}\n.connection_container.connection_type_relation_link .connection_line.hovered {\n  stroke-dasharray: none;\n}\n.connection_container.connection_type_judgement .connection_line, .connection_container.connection_type_objective .connection_line {\n  stroke-dasharray: 10 10;\n}\n.connection_container.connection_type_judgement .connection_line.hovered, .connection_container.connection_type_objective .connection_line.hovered {\n  stroke-dasharray: none;\n}\n.connection_container.negative_connection_effect .connection_line {\n  stroke: orangered;\n}\n.connection_container.negative_connection_effect .connection_end {\n  fill: orangered;\n}\n.connection_container.no_connection_effect .connection_line, .connection_container.no_connection_effect .connection_end {\n  stroke: #aaa;\n}\n\n.animate_causal_links .connection_type_causal_link .connection_line {\n  stroke-dasharray: 120 10;\n  stroke-dashoffset: 10;\n  animation: animate_dash 2s infinite linear;\n}\n\n@keyframes animate_dash {\n  from {\n    stroke-dashoffset: 10;\n  }\n  to {\n    stroke-dashoffset: -120;\n  }\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}