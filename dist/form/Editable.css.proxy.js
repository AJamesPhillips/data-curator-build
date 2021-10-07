// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".editable_field.invalid input[type=\"text\"]:focus, .editable_field.invalid textarea:focus\n{\n    background-color: pink;\n}\n\n.editable_percentage\n{\n    width: 120px; /* Width 70 needed to cope with \"100\", Width 120px needed to make it not overlap with neighbour */\n    display: inline-flex;\n}\n.editable_percentage .editable_field input[type=\"text\"]\n{\n    text-align: right;\n}\n\n.no_entry\n{\n    border: thin solid grey;\n}\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}