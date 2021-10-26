// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".wcomponent_canvas_node.connectable_canvas_node.node {\n  transition: left 0.2s ease-in-out, top 0.2s ease-in-out;\n}\n\n.wcomponent_canvas_node.connectable_canvas_node.node.node_is_moving {\n  transition: left 0s, top 0s;\n}\n\n.wcomponent_canvas_node.connectable_canvas_node.node.node_is_temporary_dragged_representation {\n  z-index: 100;\n  transition: left 0.01s, top 0.01s;\n}\n\n.wcomponent_canvas_node.connectable_canvas_node.node .node_main_content {\n  height: initial;\n  min-height: 80px;\n  text-align: center;\n  text-overflow: initial;\n  white-space: initial;\n  overflow: initial;\n  /* Attempt to allow opacity to transition smoothly */\n  transition: background-color 0.5s, color 0.5s, box-shadow 0.2s, opacity 0.2s;\n}\n\n.node_title {\n  font-size: 15px;\n  min-height: 18px;\n  display: block;\n  font-weight: 500;\n}\n\n.node_validity_container, .node_state_container {\n  display: inline-flex;\n  border-top: thin solid #CCC;\n  padding: 2px;\n  width: 100%;\n  align-items: center;\n}\n\n.color_light .node_validity_container, .color_light .node_state_container {\n  border-top: thin solid #555;\n}\n\n.node_is_selected {\n  z-index: 97;\n}\n\n.node_is_current_item {\n  z-index: 98;\n}\n\n.node_is_highlighted {\n  z-index: 99;\n}\n\n.node_is_type_action > .node_main_content {\n  box-shadow: inset orange 0px 0px 4px 2px;\n}\n\n.node_is_type_goal > .node_main_content,\n.node_is_type_judgement > .node_main_content,\n.node_is_type_objective > .node_main_content {\n  box-shadow: inset #67c767 0px 0px 4px 2px;\n}\n\n.wcomponent_canvas_node.compact_title .node_main_content .node_title {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.wcomponent_canvas_node.node_on_foundational_kv .node_main_content {\n  border-color: lightblue;\n}\n\n.wcomponent_canvas_node .node_title, .wcomponent_canvas_node .node_main_content {\n  position: relative;\n}\n\n.wcomponent_canvas_node img.background_image {\n  /* background-image: url(https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Wroclaw_Most_Mlynski_w_porannej_mgle_przed_switem.jpg/1280px-Wroclaw_Most_Mlynski_w_porannej_mgle_przed_switem.jpg); */\n  background-size: contain;\n  background-repeat: no-repeat;\n  background-position: bottom left;\n  opacity: 0.1;\n  position: absolute;\n  left: 0;\n  bottom: 0;\n  width: 100%;\n  height: 100%;\n  pointer-events: none;\n  /* Alternatively set mackground image z-index to 0 and all other elements in node to 1 with positive relative */\n}\n\n.wcomponent_canvas_node img.background_image.actor {\n  background-image: url(https://www.leafstudio.co.uk/wp-content/uploads/2019/11/person-icon-silhouette-png-0.png);\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}