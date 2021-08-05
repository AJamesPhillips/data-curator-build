import {h} from "../../_snowpack/pkg/preact.js";
import {Button} from "../sharedf/Button.js";
export function NowButton(props) {
  return /* @__PURE__ */ h(Button, {
    title: props.title,
    value: "Now",
    onClick: () => {
      const datetime_ms = new Date().getTime() + 6e4;
      props.change_datetime_ms(datetime_ms);
    },
    is_left: true
  });
}
