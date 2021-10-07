// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "\n/*  ++ copied from ValueAndPredictionSets.css  */\n.editable_list_entry\n{\n    border: thin solid rgba(73, 98, 167, 0.2);\n    border-radius: 3px;\n    padding: 3px;\n}\n\n.editable_list_entry\n{\n    background-color: white;\n}\n/*  -- copied from ValueAndPredictionSets.css  */\n\n\n.editable_list_entry .summary_header\n{\n    display: flex;\n}\n\n.editable_list_entry .summary_header .summary\n{\n    width: 100%;\n}\n\n.editable_list_entry.not_collapsable .expansion_button\n{\n    display: none;\n}\n\n.editable_list_entry .expansion_button\n{\n    margin-left: auto;\n    border: thin solid #bbb;\n    border-radius: 3px;\n    margin-right: 10px;\n    cursor: pointer;\n    font-size: 25px;\n    line-height: 0.1;\n    padding: 0px 3px;\n    vertical-align: super;\n    height: 17px;\n}\n.editable_list_entry > * > .expansion_button:before\n{\n    content: '\\2304';\n}\n.editable_list_entry.expanded > * > .expansion_button:before\n{\n    font-size: 18px;\n    line-height: initial;\n    vertical-align: initial;\n    content: '\\2303';\n}\n\n\n.editable_list_entry.in_future .summary\n{\n    color: #bbb;\n}\n.editable_list_entry.focused .summary\n{\n    font-weight: 800;\n}\n\n.editable_list_entry .details\n{\n    display: none;\n}\n.editable_list_entry.expanded > .details\n{\n    display: initial;\n}\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}