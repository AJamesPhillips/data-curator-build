// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "\n.value_and_predictions.only_one_VAP .button_add_new_list_entry,\n.value_and_predictions.only_one_VAP .button_container_confirmatory_delete\n{\n    display: none;\n}\n\n\n.value_and_predictions .item_descriptors\n{\n    display: none;\n}\n\n.value_and_predictions .entries_horizontal_dividers\n{\n    border-color: rgba(0, 0, 0, 0);\n}\n\n\n.value_and_prediction_summary .temporal_uncertainty\n{\n    flex: 6;\n}\n\n.value_and_prediction_summary .probabilities\n{\n    flex: 5;\n}\n\n.value_and_prediction_summary .temporal_uncertainty > div {\n    display: inline-flex;\n    height: 1em;\n}\n\n.value_and_prediction_summary .probabilities > div > div\n{\n    display: inline-flex;\n}\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}