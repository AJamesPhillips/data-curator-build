// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "#storage_info_button {\n  min-width: 30px;\n}\n\n.storage_name {\n  max-width: 0px;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n  transition: max-width 0.5s;\n}\n\n#storage_info_button:hover .storage_name {\n  max-width: 200px;\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}