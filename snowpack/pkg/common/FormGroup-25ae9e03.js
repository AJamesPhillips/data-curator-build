import { e as _objectWithoutProperties, _ as _extends } from './withStyles-f3a61d13.js';
import { k } from './compat.module-44e2e532.js';
import './hoist-non-react-statics.cjs-d740ad2c.js';
import { _ as __pika_web_default_export_for_treeshaking__ } from './clsx.m-e1755476.js';
import { w as withStyles } from './withStyles-92c33e5b.js';
import { v } from './preact.module-5693ab29.js';

var styles = {
  /* Styles applied to the root element. */
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap'
  },

  /* Styles applied to the root element if `row={true}`. */
  row: {
    flexDirection: 'row'
  }
};
/**
 * `FormGroup` wraps controls such as `Checkbox` and `Switch`.
 * It provides compact row layout.
 * For the `Radio`, you should be using the `RadioGroup` component instead of this one.
 */

var FormGroup = /*#__PURE__*/k(function FormGroup(props, ref) {
  var classes = props.classes,
      className = props.className,
      _props$row = props.row,
      row = _props$row === void 0 ? false : _props$row,
      other = _objectWithoutProperties(props, ["classes", "className", "row"]);

  return /*#__PURE__*/v("div", _extends({
    className: __pika_web_default_export_for_treeshaking__(classes.root, className, row && classes.row),
    ref: ref
  }, other));
});
var require$$5 = withStyles(styles, {
  name: 'MuiFormGroup'
})(FormGroup);

export { require$$5 as r };
