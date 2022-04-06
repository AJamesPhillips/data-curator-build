// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".wcomponent_background_frame {\n  position: absolute;\n  z-index: -100;\n  border-radius: 4px;\n  border-width: 2px;\n  border-style: solid;\n  pointer-events: none;\n  transition: top, left, width, height 1s linear;\n}\n.wcomponent_background_frame .editable_edge {\n  pointer-events: initial;\n  position: absolute;\n  transition: background-color, box-shadow 0.2s linear;\n}\n.wcomponent_background_frame .editable_edge:hover {\n  background-color: rgba(150, 150, 255, 0.2);\n  box-shadow: 0 0 10px 0 rgba(150, 150, 255, 0.4);\n}\n.wcomponent_background_frame .editable_edge_bottom {\n  cursor: row-resize;\n  bottom: -5px;\n  width: 100%;\n  height: 10px;\n}\n.wcomponent_background_frame .editable_edge_right {\n  cursor: col-resize;\n  right: -5px;\n  height: 100%;\n  width: 10px;\n}\n\n.canvas_drag_event .wcomponent_background_frame {\n  transition: top, left, width, height 0s linear;\n}\n.canvas_drag_event .wcomponent_background_frame .editable_edge {\n  pointer-events: none;\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}