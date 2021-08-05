// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".time_slider .MuiSlider-mark {\n  color: blue;\n}\n.time_slider .MuiSlider-mark.MuiSlider-markActive {\n  background-color: navy;\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}