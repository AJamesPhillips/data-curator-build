// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "\n.prediction_badge.counterfactual_inactive .outline\n{\n    fill: #c8c8c8;\n}\n\n.prediction_badge.counterfactual_active .outline\n{\n    fill: #ff2e2e;\n}\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}