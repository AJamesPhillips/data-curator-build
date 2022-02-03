// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".physical_button {\n  display: inline-flex;\n  border-color: #e6e6e6;\n  border-radius: 4px;\n  border-style: solid;\n  border-width: 1px;\n  box-shadow: #d9d9d9 0px 0px 0px 0px, #d9d9d9 0px 0px 0px 0px, #d9d9d9 0px 1px 0px 0px, #d9d9d9 0px 2px 0px 0px, #d9d9d9 0px 3px 0px 0px, #adb5bd 2px 1.5px 4px 0px, #adb5bd 0px -1px 1.5px 0px;\n  color: #343a40;\n  cursor: default;\n  line-height: 21px;\n  margin-bottom: 8.5px;\n  margin-left: 5.5px;\n  margin-right: 5.5px;\n  margin-top: 5.5px;\n  padding: 4px 8px;\n  transform-style: preserve-3d;\n}\n.physical_button::after {\n  border-color: #cccccc;\n  border-radius: 6px;\n  border-style: solid;\n  border-width: 1.5px;\n  bottom: -7px;\n  box-sizing: content-box;\n  content: \"\";\n  display: block;\n  height: 34px;\n  left: -4px;\n  position: absolute;\n  right: -4px;\n  top: -1px;\n  transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, -3, 1);\n  transform-style: preserve-3d;\n}\n\n.physical_action {\n  background-color: #555;\n  color: white;\n  border-radius: 4px;\n  padding: 4px 8px;\n  display: inline-flex;\n}\n\n.shortcut_plus {\n  display: inline-flex;\n  padding: 2px;\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}