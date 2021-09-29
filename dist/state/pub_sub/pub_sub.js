import {canvas_pub_sub} from "../canvas/pub_sub.js";
import {global_keys_pub_sub} from "../global_keys/pub_sub.js";
import {user_pub_sub} from "../user_info/pub_sub.js";
export const pub_sub = {
  canvas: canvas_pub_sub,
  global_keys: global_keys_pub_sub,
  user: user_pub_sub
};
