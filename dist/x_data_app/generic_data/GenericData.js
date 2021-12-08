import {h} from "../../../snowpack/pkg/preact.js";
import {useState} from "../../../snowpack/pkg/preact/hooks.js";
import {MultidimensionalDataForm} from "../MultidimensionalDataForm.js";
import {load_local_data, save_local_data} from "../state/local_data.js";
export function GenericData() {
  const [_, refresh] = useState({});
  const {
    multidimensional_states,
    multidimensional_state_datas
  } = load_local_data();
  const set_multidimensional_states = (multidimensional_states2) => {
    save_local_data({multidimensional_states: multidimensional_states2});
    refresh({});
  };
  const set_multidimensional_state_datas = (multidimensional_state_datas2) => {
    save_local_data({multidimensional_state_datas: multidimensional_state_datas2});
    refresh({});
  };
  return /* @__PURE__ */ h("div", null, "GenericData", /* @__PURE__ */ h(MultidimensionalDataForm, {
    add_multidimensional_state: (multidimensional_state) => {
      set_multidimensional_states([...multidimensional_states, multidimensional_state]);
    },
    add_multidimensional_state_data: (multidimensional_state_data) => {
      set_multidimensional_state_datas([
        ...multidimensional_state_datas,
        multidimensional_state_data
      ]);
    }
  }), /* @__PURE__ */ h("hr", null), multidimensional_states.map((multidimensional_state) => /* @__PURE__ */ h("div", null, multidimensional_state.title)));
}
