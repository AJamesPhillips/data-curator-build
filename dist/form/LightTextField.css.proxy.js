// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".hardcoded-MuiOutlinedInput-notchedOutline {\n  border-color: rgba(0, 0, 0, 0.23);\n}\n\n.hardcoded-PrivateNotchedOutline-root-67 {\n  top: -5px;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  margin: 0;\n  padding: 0 8px;\n  overflow: hidden;\n  position: absolute;\n  border-style: solid;\n  border-width: 1px;\n  border-radius: inherit;\n  pointer-events: none;\n}\n\n.hardcoded-PrivateNotchedOutline-legendLabelled-69 {\n  width: auto;\n  height: 11px;\n  display: block;\n  padding: 0;\n  font-size: 0.75em;\n  max-width: 0.01px;\n  text-align: left;\n  transition: max-width 50ms cubic-bezier(0, 0, 0.2, 1) 0ms;\n  visibility: hidden;\n}\n\n.hardcoded-PrivateNotchedOutline-legendNotched-70 {\n  max-width: 1000px;\n  transition: max-width 100ms cubic-bezier(0, 0, 0.2, 1) 50ms;\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}