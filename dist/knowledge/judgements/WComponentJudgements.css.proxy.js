// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "\n.node_judgements_container\n{\n    /*\n    Some change in last 12 hours means this is the only\n    way I have found to display the JudgementBages\n    */\n    display: contents;\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}