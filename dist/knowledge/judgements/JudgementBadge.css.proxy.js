// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "\n.judgement_badge\n{\n    width: 15px;\n    height: 15px;\n    border-radius: 3px;\n    margin: 0px 2px;\n    display: inline-block;\n}\n\n.judgement_badge.positive\n{\n    background-color: rgb(56, 175, 35);\n}\n\n.judgement_badge.negative\n{\n    background-color: rgb(175, 35, 35);\n}\n\n.judgement_badge.inactive\n{\n    background-color: rgb(175, 175, 175);\n}\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}