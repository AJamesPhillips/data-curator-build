// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "html,\nhtml body,\nhtml body #root {\n  display: block;\n  min-width: 100vw;\n  width: 100vw;\n  max-width: 100vw;\n  min-height: 100vh;\n  height: 100vh;\n  max-height: 100vh;\n  overflow: hidden;\n  margin: 0;\n  padding: 0;\n}\n\nhtml body {\n  font-family: Roboto, sans-serif;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\nhtml body #root {\n  display: flex;\n  flex-direction: column;\n}\n\n@keyframes spinning {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n.animate.spinning {\n  animation: spinning 1s linear infinite;\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}