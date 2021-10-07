// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".value_and_prediction_set_summary {\n  transition-delay: 0s;\n  transition-duration: 0.5s;\n  transition-property: all;\n  transition-timing-function: linear;\n  min-height: 100%;\n  font-size: 1em;\n}\n.value_and_prediction_set_summary .value_and_prediction {\n  transition-delay: 0s;\n  transition-duration: 0.5s;\n  transition-property: all;\n  transition-timing-function: linear;\n  max-height: 1.75em;\n  overflow: hidden;\n}\n.value_and_prediction_set_summary .value_and_prediction.prob-0 {\n  padding: 0;\n}\n.value_and_prediction_set_summary .value_and_prediction:before {\n  content: \"\";\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n}\n.value_and_prediction_set_summary.visible-2 {\n  min-height: 3.5em;\n}\n.value_and_prediction_set_summary.visible-3 {\n  min-height: 5.25em;\n}\n.value_and_prediction_set_summary.visible-4 {\n  min-height: 7em;\n}\n.value_and_prediction_set_summary.visible-5 {\n  min-height: 8.75em;\n}\n.value_and_prediction_set_summary.visible-6 {\n  min-height: 10.5em;\n}\n.value_and_prediction_set_summary .value_and_prediction:nth-child(1):before {\n  background-color: rgba(255, 255, 255, 0.6666666667);\n}\n.value_and_prediction_set_summary .value_and_prediction:nth-child(2):before {\n  background-color: rgba(255, 255, 255, 0.5);\n}\n.value_and_prediction_set_summary .value_and_prediction:nth-child(3):before {\n  background-color: rgba(255, 255, 255, 0.3333333333);\n}\n.value_and_prediction_set_summary .value_and_prediction:nth-child(4):before {\n  background-color: rgba(255, 255, 255, 0.1666666667);\n}\n.value_and_prediction_set_summary .value_and_prediction:nth-child(5):before {\n  background-color: rgba(255, 255, 255, 0);\n}\n.value_and_prediction_set_summary .value_and_prediction:nth-child(6):before {\n  background-color: rgba(255, 255, 255, 0);\n}\n.value_and_prediction_set_summary:hover {\n  display: flex;\n}\n.value_and_prediction_set_summary:hover.items-1 {\n  max-height: 1.75em;\n}\n.value_and_prediction_set_summary:hover.items-2 {\n  max-height: 3.5em;\n}\n.value_and_prediction_set_summary:hover.items-3 {\n  max-height: 5.25em;\n}\n.value_and_prediction_set_summary:hover.items-4 {\n  max-height: 7em;\n}\n.value_and_prediction_set_summary:hover.items-5 {\n  max-height: 8.75em;\n}\n.value_and_prediction_set_summary:hover.items-6 {\n  max-height: 10.5em;\n}\n.value_and_prediction_set_summary:hover .value_and_prediction {\n  font-size: 1em;\n  line-height: 1.75em;\n  max-height: 100%;\n  min-height: 0;\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}