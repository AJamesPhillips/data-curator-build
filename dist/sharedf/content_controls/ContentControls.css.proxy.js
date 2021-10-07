// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".pulsating_circle {\n  position: relative;\n  left: 50%;\n  top: -18px;\n  transform: translateX(-50%) translateY(-50%);\n  width: 30px;\n  height: 30px;\n  pointer-events: none;\n}\n.pulsating_circle:before {\n  content: \"\";\n  position: relative;\n  display: block;\n  width: 300%;\n  height: 300%;\n  box-sizing: border-box;\n  margin-left: -100%;\n  margin-top: -100%;\n  border-radius: 45px;\n  background-color: #01a4e9;\n  animation: pulse-ring 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;\n}\n\n@keyframes pulse-ring {\n  0% {\n    transform: scale(0.33);\n  }\n  80%, 100% {\n    opacity: 0;\n  }\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}