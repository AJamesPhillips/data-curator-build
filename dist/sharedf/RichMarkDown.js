import {Component, h} from "../../snowpack/pkg/preact.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import Markdown from "../../snowpack/pkg/markdown-to-jsx.js";
import {add_newlines_to_markdown} from "../form/utils.js";
import {get_wc_id_to_counterfactuals_v2_map} from "../state/derived/accessor.js";
import {replace_ids_in_text} from "../wcomponent_derived/rich_text/get_rich_text.js";
import {AnchorTag} from "./AnchorTag.js";
const map_state = (state) => ({
  rich_text: state.display_options.consumption_formatting,
  composed_wcomponents_by_id: state.derived.composed_wcomponents_by_id,
  knowledge_views_by_id: state.specialised_objects.knowledge_views_by_id,
  wc_id_to_counterfactuals_map: get_wc_id_to_counterfactuals_v2_map(state),
  created_at_ms: state.routing.args.created_at_ms,
  sim_ms: state.routing.args.sim_ms
});
const connector = connect(map_state);
class _RichMarkDown extends Component {
  render() {
    const {
      text,
      rich_text,
      composed_wcomponents_by_id,
      knowledge_views_by_id,
      wc_id_to_counterfactuals_map,
      placeholder = "...",
      created_at_ms,
      sim_ms
    } = this.props;
    const value = replace_ids_in_text({
      text,
      rich_text,
      wcomponents_by_id: composed_wcomponents_by_id,
      knowledge_views_by_id,
      wc_id_to_counterfactuals_map,
      created_at_ms,
      sim_ms
    });
    return /* @__PURE__ */ h(Markdown, {
      options: MARKDOWN_OPTIONS
    }, value && add_newlines_to_markdown(value) || placeholder);
  }
}
export const RichMarkDown = connector(_RichMarkDown);
export const MARKDOWN_OPTIONS = {
  overrides: {
    a: AnchorTag,
    script: (props) => props.children,
    auto: (props) => "",
    iframe: (props) => {
      const {src} = props;
      const url = new URL(src);
      const allow = url.hostname === "www.youtube.com";
      return allow ? /* @__PURE__ */ h("iframe", {
        ...props
      }) : null;
    },
    tweet: (props) => {
      const src = `https://platform.twitter.com/embed/Tweet.html?dnt=false&frame=false&hideCard=false&hideThread=false&id=${props.id}&lang=en-gb&theme=light&widgetsVersion=0a8eea3%3A1643743420422&width=400px"`;
      return /* @__PURE__ */ h("iframe", {
        src,
        scrolling: "no",
        frameBorder: 0,
        allowTransparency: true,
        allowFullScreen: true,
        style: {width: 401, height: 624}
      });
    },
    img: (props) => {
      delete props.style?.position;
      return /* @__PURE__ */ h("img", {
        src: props.src,
        style: props.style,
        alt: props.alt
      });
    }
  }
};
