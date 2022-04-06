// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".wcomponent_canvas_node.connectable_canvas_node.node {\n  transition: left 1s linear, top 1s linear, opacity 1s linear;\n}\n.wcomponent_canvas_node.connectable_canvas_node.node.node_is_moving {\n  z-index: 100;\n  transition: left 0.01s, top 0.01s;\n}\n.wcomponent_canvas_node.connectable_canvas_node.node .node_main_content {\n  height: initial;\n  min-height: 80px;\n  text-align: center;\n  text-overflow: initial;\n  white-space: initial;\n  overflow: initial;\n  /* Attempt to allow opacity to transition smoothly */\n  transition: background-color 1s, color 1s, box-shadow 0.2s, opacity 0.2s;\n}\n\n.node_title {\n  font-size: 15px;\n  min-height: 18px;\n  display: block;\n  font-weight: 500;\n  overflow-wrap: break-word;\n}\n\n.node_validity_container, .node_state_container {\n  flex-wrap: wrap;\n  display: flex;\n  overflow: hidden;\n  padding: 2px;\n  width: 100%;\n  max-width: 100%;\n  align-items: center;\n}\n\n.node_sub_state_container {\n  display: flex;\n  max-width: 100%;\n  overflow: hidden;\n}\n\n.node_state_container .value_and_prediction_summary, .node_sub_state_container .value_and_prediction_summary {\n  width: 70%;\n  flex-grow: 1;\n  flex-shrink: 1;\n  overflow: hidden;\n}\n\n.color_light .description_icon {\n  color: #cecece;\n}\n\n.node_is_selected {\n  z-index: 97;\n}\n\n.node_is_current_item {\n  z-index: 98;\n}\n\n.node_is_highlighted {\n  z-index: 99;\n}\n\n.node_missing > .node_main_content {\n  background-color: #fafafa;\n}\n\n.node_is_type_action > .node_main_content {\n  box-shadow: inset orange 0px 0px 4px 2px;\n  background-color: #ffeec6;\n}\n\n.past_certain > .node_main_content {\n  background-color: #3e375a;\n}\n\n.past_uncertain > .node_main_content {\n  background-color: pink;\n}\n\n.node_is_type_goal > .node_main_content,\n.node_is_type_judgement > .node_main_content,\n.node_is_type_objective > .node_main_content {\n  box-shadow: inset #67c767 0px 0px 4px 2px;\n  background-color: #cfffc6;\n}\n\n.wcomponent_canvas_node.compact_title .node_main_content .node_title {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.wcomponent_canvas_node.node_on_foundational_kv .node_main_content {\n  border-color: lightblue;\n}\n\n.wcomponent_canvas_node .node_title, .wcomponent_canvas_node .node_main_content {\n  position: relative;\n}\n\n.wcomponent_canvas_node .background_image {\n  /* background-image: url(https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Wroclaw_Most_Mlynski_w_porannej_mgle_przed_switem.jpg/1280px-Wroclaw_Most_Mlynski_w_porannej_mgle_przed_switem.jpg); */\n  background-size: contain;\n  background-repeat: no-repeat;\n  background-position: bottom left;\n  opacity: 0.1;\n  position: absolute;\n  left: 0;\n  bottom: 0;\n  width: 100%;\n  height: 100%;\n  pointer-events: none;\n  /* Alternatively set mackground image z-index to 0 and all other elements in node to 1 with positive relative */\n}\n\n.wcomponent_canvas_node.node_is_type_actor .background_image {\n  background-image: url(https://www.leafstudio.co.uk/wp-content/uploads/2019/11/person-icon-silhouette-png-0.png);\n}\n\n.canvas_drag_event .wcomponent_canvas_node {\n  pointer-events: none;\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}