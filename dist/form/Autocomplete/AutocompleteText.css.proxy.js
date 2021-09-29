// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "\n.editable_field.autocomplete\n{\n    position: relative;\n}\n\n.editable_field.autocomplete .options_outer\n{\n    position: absolute;\n    left: 0;\n    top: 1.15em;\n    z-index: 2;\n    width: 100%;\n}\n.editable_field.autocomplete .options_inner\n{\n    position: absolute;\n    padding: 3px 5px;\n    border: thin solid #777;\n    border-radius: 3px;\n    background-color: rgba(251, 251, 251, 0.7);\n    backdrop-filter: blur(3px);\n}\n\n.editable_field.autocomplete .options_inner .option\n{\n    padding: 3px;\n    border: thin solid #777;\n    border-radius: 3px;\n    margin: 4px 2px;\n    width: fit-content;\n    cursor: pointer;\n    background-color: rgba(255, 255, 255);\n}\n\n.editable_field.autocomplete .options_inner .option_wrapper.highlighted\n{\n    cursor: pointer;\n    background-color: rgba(205, 215, 255);\n}\n\n.editable_field.autocomplete .option_subtitle\n{\n    font-size: 12px;\n    color: #aaa;\n}\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}