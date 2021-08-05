// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "\n.editable_field\n{\n    /* So that the div expands to contain the input element otherwise the input overlaps\n       with other elements.  Usually not a problem unless it's a date in which case the\n       \"invalid\" nature and it's background colour of pink is obviously overlapping other\n       things.\n    */\n    display: flex;\n}\n\n.editable_field input[type=\"text\"], .editable_field textarea {\n    border: none;\n    font-family: inherit;\n    font-size: inherit;\n    font-weight: inherit;\n    padding: 0px 2px;\n    color: inherit;\n    background-color: inherit;\n    width: 100%;\n    max-width: 100%;\n}\n\n.editable_field input[type=\"text\"]\n{\n    height: 1.15em;\n}\n\n.editable_field.placeholder\n{\n    color: grey;\n}\n\n.editable_field.invalid input[type=\"text\"]:focus, .editable_field.invalid textarea:focus\n{\n    background-color: pink;\n}\n\n\n.editable_percentage\n{\n    width: 65px; /* Width 55 sufficient for a value of 0.00 when not bolded, but 65 needed to cope with bolded */\n    display: inline-flex;\n}\n.editable_percentage .editable_field input[type=\"text\"]\n{\n    text-align: right;\n}\n\n.no_entry\n{\n    border: thin solid grey;\n}\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}