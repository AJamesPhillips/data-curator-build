// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "\n\n.prediction_graph.mini .label\n{\n    font-size: 8px;\n    text-align: left;\n}\n/* .prediction_graph.mini .label:hover\n{\n    font-size: 20px;\n    background-color: white;\n    position: absolute;\n    top: -12px;\n    z-index: 1;\n} */\n.prediction_graph.mini .label_b\n{\n    position: absolute;\n    top: 0px;\n    right: 0;\n    text-align: right;\n}\n/* .prediction_graph.mini .label_b:hover\n{\n    top: -5px;\n} */\n\n\n.prediction_graph .prediction_column_container\n{\n    display: inline-block;\n}\n\n.prediction_graph .prediction_column\n{\n    background-color: rgb(250, 255, 173);\n}\n\n.prediction_graph .prediction_column:hover\n{\n    /* border: 1px solid orange;\n    margin: -1px; */\n    background-color: orange;\n}\n\n.prediction_graph .prediction_cell\n{\n    /* margin: 3px 0; */\n    /* padding: 1px; */\n    border: 2px solid rgba(255,255,255,0.5);\n}\n\n.prediction_graph .prediction_cell:hover\n{\n    /* padding: 0px; */\n    border: 2px solid orange;\n}\n\n.multiple_mini_prediction_graphs > div\n{\n    display: inline-block;\n    margin: 0 10px;\n}\n\n.prediction_graph.invalid, .prediction_graph.invalid .prediction_column\n{\n    background-color: rgba(255,0,0,0.4);\n}\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}