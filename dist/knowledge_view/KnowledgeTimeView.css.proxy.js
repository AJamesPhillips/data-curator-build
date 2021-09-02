// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".scroll_area_x {\n  overflow-x: auto;\n  overflow-y: hidden;\n}\n\n.scroll_area_y {\n  overflow-y: auto;\n  overflow-x: hidden;\n}\n\n.time_view.timeline_spacing .vaps .vap {\n  transform: translate(-50%, 0);\n}\n.time_view .rotater {\n  white-space: nowrap;\n  transform: translate(50%, 0) rotate(90deg);\n  transform-origin: center bottom;\n}\n.time_view .tick {\n  border-left: 1px rgba(128, 128, 128, 0.5) dashed;\n}\n.time_view .seconds {\n  display: none;\n}\n.time_view.seconds .seconds {\n  display: initial;\n}\n.time_view .minutes {\n  display: none;\n}\n.time_view.minutes .minutes {\n  display: initial;\n}\n.time_view .hours {\n  display: none;\n}\n.time_view.hours .hours {\n  display: initial;\n}\n.time_view .days {\n  display: none;\n}\n.time_view.days .days {\n  display: initial;\n}\n.time_view .weeks {\n  display: none;\n}\n.time_view.weeks .weeks {\n  display: initial;\n}\n.time_view .months {\n  display: none;\n}\n.time_view.months .months {\n  display: initial;\n}\n.time_view .years {\n  display: none;\n}\n.time_view.years .years {\n  display: initial;\n}\n.time_view .vaps:empty {\n  display: none;\n}\n.time_view .vaps .vap:hover {\n  z-index: 9;\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}