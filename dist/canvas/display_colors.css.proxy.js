// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".color_green {\n  color: #C8F7B8;\n}\n\n.color_yellow {\n  color: #FDE6A8;\n}\n\n.color_blue {\n  color: #C5D6FD;\n}\n\n.color_red {\n  color: #F7D2DE;\n}\n\n.color_white {\n  color: #FFF;\n}\n\n.color_light .node_title, .color_light .node_validity_value_container {\n  color: white;\n}\n.color_light .node_title a {\n  color: #c3c3ff;\n}\n\n.sub_state_type_indicators .sub_state_type_status__set {\n  color: rgba(50, 50, 50, 0.8);\n}\n.sub_state_type_indicators .sub_state_type_status__not_set {\n  color: rgba(200, 200, 200, 0.4);\n}\n.sub_state_type_indicators .sub_state_type_status__invalid {\n  color: rgba(200, 0, 0, 0.8);\n}\n\n.color_light .sub_state_type_indicators .sub_state_type_status__set {\n  color: #c8c8c8;\n}\n.color_light .sub_state_type_indicators .sub_state_type_status__not_set {\n  color: #787878;\n}\n.color_light .sub_state_type_indicators .sub_state_type_status__invalid {\n  color: #ff6464;\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}