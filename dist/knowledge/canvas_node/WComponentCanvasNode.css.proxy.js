// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".wcomponent_canvas_node.connectable_canvas_node.node .node_main_content\n{\n    height: initial;\n    min-height: 80px;\n    text-overflow: initial;\n    white-space: initial;\n    overflow: initial;\n    /* Attempt to allow opacity to transition smoothly */\n    transition: background-color 0.2s, color 0.2s, box-shadow 0.2s, opacity 0.2s;\n}\n\n\n.node_title\n{\n    font-size: 14px;\n    min-height: 18px;\n    display: block;\n}\n\n.node_validity_container, .node_state_container\n{\n    display: inline-flex;\n    border-top: thin solid #CCC;\n    padding: 2px;\n    width: 100%;\n    align-items: center;\n}\n\n\n.node_is_selected\n{\n    z-index: 97;\n}\n\n.node_is_current_item\n{\n    z-index: 98;\n}\n\n.node_is_highlighted\n{\n    z-index: 99;\n}\n\n.node_is_moving\n{\n    z-index: 100;\n}\n\n.node_is_type_action > .node_main_content\n{\n    box-shadow: inset orange 0px 0px 5px 3px;\n}\n.node_is_type_goal > .node_main_content\n, .node_is_type_judgement > .node_main_content\n, .node_is_type_objective > .node_main_content\n{\n    box-shadow: inset #67c767 0px 0px 5px 3px;\n}\n\n\n.wcomponent_canvas_node.compact_title .node_main_content .node_title\n{\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n}\n\n.wcomponent_canvas_node.node_on_foundational_kv .node_main_content\n{\n    border-color: lightblue;\n}\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}