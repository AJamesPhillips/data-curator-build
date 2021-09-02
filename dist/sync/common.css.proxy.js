// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".section {\n  border-radius: 4px;\n  padding: 5px;\n  margin: 25px 0;\n  border: thin solid #555;\n  background-color: #fafafa;\n}\n.section.warning {\n  border: thin solid #b4a905;\n  background-color: #fffed2;\n}\n.section.danger {\n  border: thin solid #b40505;\n  background-color: #ffd2d2;\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}