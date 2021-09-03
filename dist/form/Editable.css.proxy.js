// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".editable_field.invalid input[type=\"text\"]:focus, .editable_field.invalid textarea:focus\n{\n    background-color: pink;\n}\n\n.editable_percentage\n{\n    width: 65px; /* Width 55 sufficient for a value of 0.00 when not bolded, but 65 needed to cope with bolded */\n    display: inline-flex;\n}\n.editable_percentage .editable_field input[type=\"text\"]\n{\n    text-align: right;\n}\n\n.no_entry\n{\n    border: thin solid grey;\n}\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}