// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "\n@keyframes morph_border_color {\n    0% { border-color: rgb(175,175,175); }\n    40% { border-color: rgb(125,125,255); }\n    50% { border-color: rgb(200,200,255); }\n    40% { border-color: rgb(125,125,255); }\n    100% { border-color: rgb(175,175,175); }\n}\n\n@keyframes morph_color {\n    0% { color: initial; }\n    40% { color: rgb(125,125,255); }\n    50% { color: rgb(200,200,255); }\n    65% { color: rgb(125,125,255); }\n    100% { color: initial; }\n}\n\n.new_item_form > .editable_list_entry {\n    animation: morph_border_color 1s linear;\n    animation-iteration-count: infinite;\n}\n\n.add_new_item {\n    animation: morph_color 1s linear;\n    animation-iteration-count: infinite;\n}\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}