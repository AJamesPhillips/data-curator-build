// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".multi_dimensional_data_tabletable {\n  border-collapse: collapse;\n}\n.multi_dimensional_data_table td {\n  border: 1px solid #555;\n  padding: 3px 5px;\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}