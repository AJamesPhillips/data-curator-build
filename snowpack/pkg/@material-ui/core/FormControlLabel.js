import { c as createCommonjsModule, g as getDefaultExportFromCjs } from '../../common/_commonjsHelpers-4f955397.js';
import { i as interopRequireDefault } from '../../common/interopRequireDefault-146b584c.js';
import { i as interopRequireWildcard } from '../../common/interopRequireWildcard-4c12a3b0.js';
import { _ as _extends_1, o as objectWithoutProperties } from '../../common/objectWithoutProperties-ecdc3a69.js';
import { a as compat_module } from '../../common/compat.module-44e2e532.js';
import { p as propTypes } from '../../common/hoist-non-react-statics.cjs-d740ad2c.js';
import { _ as __pika_web_default_export_for_treeshaking__$1 } from '../../common/clsx.m-e1755476.js';
import { b as FormControl$1, a as useFormControl, r as require$$6 } from '../../common/FormControl-05e8a012.js';
import { w as withStyles_1 } from '../../common/withStyles-82e4af86.js';
import { c as capitalize_1 } from '../../common/capitalize-f472ba50.js';
import '../../common/hooks.module-b65ed191.js';
import '../../common/preact.module-5693ab29.js';
import '../../common/withStyles-db69868f.js';
import '../../common/withStyles-c88b9f29.js';
import '../../common/capitalize-e4ddbb9a.js';
import '../../common/isMuiElement-c285a3f2.js';
import '../../common/defaultTheme-bad95161.js';
import '../../common/ThemeProvider-88504205.js';

var FormControl = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': FormControl$1,
  useFormControl: useFormControl
});

var FormControlLabel_1 = createCommonjsModule(function (module, exports) {





Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.styles = void 0;

var _extends2 = interopRequireDefault(_extends_1);

var _objectWithoutProperties2 = interopRequireDefault(objectWithoutProperties);

var React = interopRequireWildcard(compat_module);

var _propTypes = interopRequireDefault(propTypes);

var _clsx = interopRequireDefault(__pika_web_default_export_for_treeshaking__$1);





var _withStyles = interopRequireDefault(withStyles_1);

var _Typography = interopRequireDefault(require$$6);

var _capitalize = interopRequireDefault(capitalize_1);

var styles = function styles(theme) {
  return {
    /* Styles applied to the root element. */
    root: {
      display: 'inline-flex',
      alignItems: 'center',
      cursor: 'pointer',
      // For correct alignment with the text.
      verticalAlign: 'middle',
      WebkitTapHighlightColor: 'transparent',
      marginLeft: -11,
      marginRight: 16,
      // used for row presentation of radio/checkbox
      '&$disabled': {
        cursor: 'default'
      }
    },

    /* Styles applied to the root element if `labelPlacement="start"`. */
    labelPlacementStart: {
      flexDirection: 'row-reverse',
      marginLeft: 16,
      // used for row presentation of radio/checkbox
      marginRight: -11
    },

    /* Styles applied to the root element if `labelPlacement="top"`. */
    labelPlacementTop: {
      flexDirection: 'column-reverse',
      marginLeft: 16
    },

    /* Styles applied to the root element if `labelPlacement="bottom"`. */
    labelPlacementBottom: {
      flexDirection: 'column',
      marginLeft: 16
    },

    /* Pseudo-class applied to the root element if `disabled={true}`. */
    disabled: {},

    /* Styles applied to the label's Typography component. */
    label: {
      '&$disabled': {
        color: theme.palette.text.disabled
      }
    }
  };
};
/**
 * Drop in replacement of the `Radio`, `Switch` and `Checkbox` component.
 * Use this component if you want to display an extra label.
 */


exports.styles = styles;
var FormControlLabel = /*#__PURE__*/React.forwardRef(function FormControlLabel(props, ref) {
  var checked = props.checked,
      classes = props.classes,
      className = props.className,
      control = props.control,
      disabledProp = props.disabled,
      inputRef = props.inputRef,
      label = props.label,
      _props$labelPlacement = props.labelPlacement,
      labelPlacement = _props$labelPlacement === void 0 ? 'end' : _props$labelPlacement,
      name = props.name,
      onChange = props.onChange,
      value = props.value,
      other = (0, _objectWithoutProperties2.default)(props, ["checked", "classes", "className", "control", "disabled", "inputRef", "label", "labelPlacement", "name", "onChange", "value"]);
  var muiFormControl = (0, FormControl.useFormControl)();
  var disabled = disabledProp;

  if (typeof disabled === 'undefined' && typeof control.props.disabled !== 'undefined') {
    disabled = control.props.disabled;
  }

  if (typeof disabled === 'undefined' && muiFormControl) {
    disabled = muiFormControl.disabled;
  }

  var controlProps = {
    disabled: disabled
  };
  ['checked', 'name', 'onChange', 'value', 'inputRef'].forEach(function (key) {
    if (typeof control.props[key] === 'undefined' && typeof props[key] !== 'undefined') {
      controlProps[key] = props[key];
    }
  });
  return /*#__PURE__*/React.createElement("label", (0, _extends2.default)({
    className: (0, _clsx.default)(classes.root, className, labelPlacement !== 'end' && classes["labelPlacement".concat((0, _capitalize.default)(labelPlacement))], disabled && classes.disabled),
    ref: ref
  }, other), /*#__PURE__*/React.cloneElement(control, controlProps), /*#__PURE__*/React.createElement(_Typography.default, {
    component: "span",
    className: (0, _clsx.default)(classes.label, disabled && classes.disabled)
  }, label));
});

var _default = (0, _withStyles.default)(styles, {
  name: 'MuiFormControlLabel'
})(FormControlLabel);

exports.default = _default;
});

var FormControlLabel = createCommonjsModule(function (module, exports) {



Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function get() {
    return _FormControlLabel.default;
  }
});

var _FormControlLabel = interopRequireDefault(FormControlLabel_1);
});

var __pika_web_default_export_for_treeshaking__ = /*@__PURE__*/getDefaultExportFromCjs(FormControlLabel);

export default __pika_web_default_export_for_treeshaking__;
