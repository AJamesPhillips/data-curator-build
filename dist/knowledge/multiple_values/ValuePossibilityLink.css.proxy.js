// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "\n\n.possible_value_link.clickable\n{\n    cursor: pointer;\n}\n\n.possible_value_link.disabled\n{\n    cursor: not-allowed;\n    color: grey;\n    opacity: 0.8;\n}\n\n.possible_value_link .show_on_hover, .possible_value_link:hover .hide_on_hover\n{\n    display: none;\n}\n\n.possible_value_link:hover .show_on_hover\n{\n    display: initial;\n}\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}