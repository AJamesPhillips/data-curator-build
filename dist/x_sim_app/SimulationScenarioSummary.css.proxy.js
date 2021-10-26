// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".scenario_summary {\n  border: thin solid grey;\n  border-radius: 3px;\n  padding: 5px;\n  margin: 5px;\n  background-color: #fdfdfc;\n}\n\n.simulation_run {\n  float: right;\n}\n\n.simulation_run button {\n  margin: 3px;\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}