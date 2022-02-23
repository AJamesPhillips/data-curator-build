// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".judgement_badge {\n  width: 15px;\n  height: 15px;\n  border-radius: 3px;\n  margin: 0px 2px;\n  display: inline-block;\n}\n.judgement_badge.medium {\n  width: 25px;\n  height: 25px;\n}\n\n.judgement_badge.positive {\n  /* background-color: rgb(56, 175, 35); */\n  background-color: #40a71f;\n}\n\n.judgement_badge.negative {\n  background-color: #af2323;\n}\n\n.judgement_badge.inactive {\n  background-color: dimgray;\n}\n\n.judgement_badge.improving svg {\n  stroke: #40dd21;\n  fill: #40dd21;\n}\n\n.judgement_badge.stable svg {\n  stroke: #ffff00;\n  fill: #ffff00;\n}\n\n.judgement_badge.worsening svg {\n  stroke: #ff5555;\n  fill: #ff5555;\n}\n\n.judgement_badge.unknown svg {\n  stroke: #ddd;\n  fill: #ddd;\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}