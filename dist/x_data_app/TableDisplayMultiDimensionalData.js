import {h} from "../../snowpack/pkg/preact.js";
import "./TableDisplayMultiDimensionalData.css.proxy.js";
export function TableDisplayMultiDimensionalData(props) {
  return /* @__PURE__ */ h("table", {
    class: "multi_dimensional_data_table"
  }, /* @__PURE__ */ h("thead", null), /* @__PURE__ */ h("tbody", null, props.data.map((row) => /* @__PURE__ */ h("tr", null, row.map((cell) => /* @__PURE__ */ h("td", null, cell))))));
}
