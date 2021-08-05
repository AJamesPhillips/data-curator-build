// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "\na.link\n{\n  text-decoration: none;\n  color: initial;\n  /* display: block; */\n  /* Disabling height and width to 100% as Link after Judgement's target component\n  is taking up excessive horizontal space */\n  /* height: 100%;\n  width: 100%; */\n}\n\na.link.selected\n{\n  background-color: rgba(150, 150, 240, 0.2);\n}\n\n.clicked_animate\n{\n  animation-duration: 300ms;\n  animation-name: click_animation;\n}\n\n@keyframes click_animation {\n  0% { background-color: rgba(150, 150, 240, 1); }\n  1000% { background-color: rgba(150, 150, 240, 0.2); }\n}\n\ninput[type=button].styled\n{\n  margin: 1px;\n}\n\ninput[type=button].styled.selected\n{\n  background-color: #FAFAFF;\n  border-radius: 2px;\n  border-width: 1px;\n  padding: 2px 7px;\n}\n\ninput[type=button].styled.selected:focus\n{\n  outline-style: none;\n}\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}