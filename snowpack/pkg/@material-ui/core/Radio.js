import { c as createCommonjsModule, b as getDefaultExportFromCjs } from '../../common/_commonjsHelpers-c99fd594.js';
import { i as interopRequireDefault } from '../../common/interopRequireDefault-189da5a0.js';
import { i as interopRequireWildcard } from '../../common/interopRequireWildcard-b04711e4.js';
import { _ as _extends_1, o as objectWithoutProperties } from '../../common/objectWithoutProperties-4c19274d.js';
import { a as compat_module } from '../../common/compat.module-44e2e532.js';
import { p as propTypes } from '../../common/hoist-non-react-statics.cjs-c36e250e.js';
import { r as require$$4 } from '../../common/withStyles-9ad24414.js';
import { s as slicedToArray, b as useControlled_1 } from '../../common/useControlled-dbb03576.js';
import { u as useFormControl_1 } from '../../common/useFormControl-5bd12e19.js';
import { w as withStyles_1 } from '../../common/withStyles-ce4e4c70.js';
import { r as require$$9 } from '../../common/IconButton-3da50b61.js';
import { r as require$$2 } from '../../common/SvgIcon-11a4dc70.js';
import { c as colorManipulator } from '../../common/defaultTheme-606b3b98.js';
import { c as capitalize_1 } from '../../common/capitalize-cd41b4a1.js';
import { u as useRadioGroup_1 } from '../../common/useRadioGroup-d271dd6a.js';
import '../../common/hooks.module-b65ed191.js';
import '../../common/preact.module-5693ab29.js';
import '../../common/withStyles-67c09166.js';
import '../../common/capitalize-37b8be70.js';
import '../../common/ButtonBase-225da5ca.js';
import '../../common/useForkRef-e701e1c9.js';
import '../../common/useIsFocusVisible-7e963aeb.js';
import '../../common/TransitionGroupContext-717896c3.js';
import '../../common/ThemeProvider-77286515.js';

var SwitchBase_1 = createCommonjsModule(function (module, exports) {





Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.styles = void 0;

var _extends2 = interopRequireDefault(_extends_1);

var _slicedToArray2 = interopRequireDefault(slicedToArray);

var _objectWithoutProperties2 = interopRequireDefault(objectWithoutProperties);

var React = interopRequireWildcard(compat_module);

var _propTypes = interopRequireDefault(propTypes);

var _clsx = interopRequireDefault(require$$4);



var _useControlled3 = interopRequireDefault(useControlled_1);

var _useFormControl = interopRequireDefault(useFormControl_1);

var _withStyles = interopRequireDefault(withStyles_1);

var _IconButton = interopRequireDefault(require$$9);

var styles = {
  root: {
    padding: 9
  },
  checked: {},
  disabled: {},
  input: {
    cursor: 'inherit',
    position: 'absolute',
    opacity: 0,
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    margin: 0,
    padding: 0,
    zIndex: 1
  }
};
/**
 * @ignore - internal component.
 */

exports.styles = styles;
var SwitchBase = /*#__PURE__*/React.forwardRef(function SwitchBase(props, ref) {
  var autoFocus = props.autoFocus,
      checkedProp = props.checked,
      checkedIcon = props.checkedIcon,
      classes = props.classes,
      className = props.className,
      defaultChecked = props.defaultChecked,
      disabledProp = props.disabled,
      icon = props.icon,
      id = props.id,
      inputProps = props.inputProps,
      inputRef = props.inputRef,
      name = props.name,
      onBlur = props.onBlur,
      onChange = props.onChange,
      onFocus = props.onFocus,
      readOnly = props.readOnly,
      required = props.required,
      tabIndex = props.tabIndex,
      type = props.type,
      value = props.value,
      other = (0, _objectWithoutProperties2.default)(props, ["autoFocus", "checked", "checkedIcon", "classes", "className", "defaultChecked", "disabled", "icon", "id", "inputProps", "inputRef", "name", "onBlur", "onChange", "onFocus", "readOnly", "required", "tabIndex", "type", "value"]);

  var _useControlled = (0, _useControlled3.default)({
    controlled: checkedProp,
    default: Boolean(defaultChecked),
    name: 'SwitchBase',
    state: 'checked'
  }),
      _useControlled2 = (0, _slicedToArray2.default)(_useControlled, 2),
      checked = _useControlled2[0],
      setCheckedState = _useControlled2[1];

  var muiFormControl = (0, _useFormControl.default)();

  var handleFocus = function handleFocus(event) {
    if (onFocus) {
      onFocus(event);
    }

    if (muiFormControl && muiFormControl.onFocus) {
      muiFormControl.onFocus(event);
    }
  };

  var handleBlur = function handleBlur(event) {
    if (onBlur) {
      onBlur(event);
    }

    if (muiFormControl && muiFormControl.onBlur) {
      muiFormControl.onBlur(event);
    }
  };

  var handleInputChange = function handleInputChange(event) {
    var newChecked = event.target.checked;
    setCheckedState(newChecked);

    if (onChange) {
      // TODO v5: remove the second argument.
      onChange(event, newChecked);
    }
  };

  var disabled = disabledProp;

  if (muiFormControl) {
    if (typeof disabled === 'undefined') {
      disabled = muiFormControl.disabled;
    }
  }

  var hasLabelFor = type === 'checkbox' || type === 'radio';
  return /*#__PURE__*/React.createElement(_IconButton.default, (0, _extends2.default)({
    component: "span",
    className: (0, _clsx.default)(classes.root, className, checked && classes.checked, disabled && classes.disabled),
    disabled: disabled,
    tabIndex: null,
    role: undefined,
    onFocus: handleFocus,
    onBlur: handleBlur,
    ref: ref
  }, other), /*#__PURE__*/React.createElement("input", (0, _extends2.default)({
    autoFocus: autoFocus,
    checked: checkedProp,
    defaultChecked: defaultChecked,
    className: classes.input,
    disabled: disabled,
    id: hasLabelFor && id,
    name: name,
    onChange: handleInputChange,
    readOnly: readOnly,
    ref: inputRef,
    required: required,
    tabIndex: tabIndex,
    type: type,
    value: value
  }, inputProps)), checked ? checkedIcon : icon);
}); // NB: If changed, please update Checkbox, Switch and Radio

var _default = (0, _withStyles.default)(styles, {
  name: 'PrivateSwitchBase'
})(SwitchBase);

exports.default = _default;
});

var createSvgIcon_1 = createCommonjsModule(function (module, exports) {



Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createSvgIcon;

var _extends2 = interopRequireDefault(_extends_1);

var _react = interopRequireDefault(compat_module);

var _SvgIcon = interopRequireDefault(require$$2);

/**
 * Private module reserved for @material-ui/x packages.
 */
function createSvgIcon(path, displayName) {
  var Component = function Component(props, ref) {
    return /*#__PURE__*/_react.default.createElement(_SvgIcon.default, (0, _extends2.default)({
      ref: ref
    }, props), path);
  };

  Component.muiName = _SvgIcon.default.muiName;
  return /*#__PURE__*/_react.default.memo( /*#__PURE__*/_react.default.forwardRef(Component));
}
});

var RadioButtonUnchecked = createCommonjsModule(function (module, exports) {





Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = interopRequireWildcard(compat_module);

var _createSvgIcon = interopRequireDefault(createSvgIcon_1);

/**
 * @ignore - internal component.
 */
var _default = (0, _createSvgIcon.default)( /*#__PURE__*/React.createElement("path", {
  d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
}), 'RadioButtonUnchecked');

exports.default = _default;
});

var RadioButtonChecked = createCommonjsModule(function (module, exports) {





Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = interopRequireWildcard(compat_module);

var _createSvgIcon = interopRequireDefault(createSvgIcon_1);

/**
 * @ignore - internal component.
 */
var _default = (0, _createSvgIcon.default)( /*#__PURE__*/React.createElement("path", {
  d: "M8.465 8.465C9.37 7.56 10.62 7 12 7C14.76 7 17 9.24 17 12C17 13.38 16.44 14.63 15.535 15.535C14.63 16.44 13.38 17 12 17C9.24 17 7 14.76 7 12C7 10.62 7.56 9.37 8.465 8.465Z"
}), 'RadioButtonChecked');

exports.default = _default;
});

var RadioButtonIcon_1 = createCommonjsModule(function (module, exports) {





Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.styles = void 0;

var React = interopRequireWildcard(compat_module);

var _propTypes = interopRequireDefault(propTypes);

var _clsx = interopRequireDefault(require$$4);

var _RadioButtonUnchecked = interopRequireDefault(RadioButtonUnchecked);

var _RadioButtonChecked = interopRequireDefault(RadioButtonChecked);

var _withStyles = interopRequireDefault(withStyles_1);

var styles = function styles(theme) {
  return {
    root: {
      position: 'relative',
      display: 'flex',
      '&$checked $layer': {
        transform: 'scale(1)',
        transition: theme.transitions.create('transform', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.shortest
        })
      }
    },
    layer: {
      left: 0,
      position: 'absolute',
      transform: 'scale(0)',
      transition: theme.transitions.create('transform', {
        easing: theme.transitions.easing.easeIn,
        duration: theme.transitions.duration.shortest
      })
    },
    checked: {}
  };
};
/**
 * @ignore - internal component.
 */


exports.styles = styles;

function RadioButtonIcon(props) {
  var checked = props.checked,
      classes = props.classes,
      fontSize = props.fontSize;
  return /*#__PURE__*/React.createElement("div", {
    className: (0, _clsx.default)(classes.root, checked && classes.checked)
  }, /*#__PURE__*/React.createElement(_RadioButtonUnchecked.default, {
    fontSize: fontSize
  }), /*#__PURE__*/React.createElement(_RadioButtonChecked.default, {
    fontSize: fontSize,
    className: classes.layer
  }));
}

var _default = (0, _withStyles.default)(styles, {
  name: 'PrivateRadioButtonIcon'
})(RadioButtonIcon);

exports.default = _default;
});

var createChainedFunction_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createChainedFunction;

/**
 * Safe chained function
 *
 * Will only create a new function if needed,
 * otherwise will pass back existing functions or null.
 *
 * @param {function} functions to chain
 * @returns {function|null}
 */
function createChainedFunction() {
  for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  return funcs.reduce(function (acc, func) {
    if (func == null) {
      return acc;
    }

    return function chainedFunction() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      acc.apply(this, args);
      func.apply(this, args);
    };
  }, function () {});
}
});

var Radio_1 = createCommonjsModule(function (module, exports) {





Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.styles = void 0;

var _extends2 = interopRequireDefault(_extends_1);

var _objectWithoutProperties2 = interopRequireDefault(objectWithoutProperties);

var React = interopRequireWildcard(compat_module);

var _propTypes = interopRequireDefault(propTypes);

var _clsx = interopRequireDefault(require$$4);



var _SwitchBase = interopRequireDefault(SwitchBase_1);

var _RadioButtonIcon = interopRequireDefault(RadioButtonIcon_1);



var _capitalize = interopRequireDefault(capitalize_1);

var _createChainedFunction = interopRequireDefault(createChainedFunction_1);

var _withStyles = interopRequireDefault(withStyles_1);

var _useRadioGroup = interopRequireDefault(useRadioGroup_1);

var styles = function styles(theme) {
  return {
    /* Styles applied to the root element. */
    root: {
      color: theme.palette.text.secondary
    },

    /* Pseudo-class applied to the root element if `checked={true}`. */
    checked: {},

    /* Pseudo-class applied to the root element if `disabled={true}`. */
    disabled: {},

    /* Styles applied to the root element if `color="primary"`. */
    colorPrimary: {
      '&$checked': {
        color: theme.palette.primary.main,
        '&:hover': {
          backgroundColor: (0, colorManipulator.fade)(theme.palette.primary.main, theme.palette.action.hoverOpacity),
          // Reset on touch devices, it doesn't add specificity
          '@media (hover: none)': {
            backgroundColor: 'transparent'
          }
        }
      },
      '&$disabled': {
        color: theme.palette.action.disabled
      }
    },

    /* Styles applied to the root element if `color="secondary"`. */
    colorSecondary: {
      '&$checked': {
        color: theme.palette.secondary.main,
        '&:hover': {
          backgroundColor: (0, colorManipulator.fade)(theme.palette.secondary.main, theme.palette.action.hoverOpacity),
          // Reset on touch devices, it doesn't add specificity
          '@media (hover: none)': {
            backgroundColor: 'transparent'
          }
        }
      },
      '&$disabled': {
        color: theme.palette.action.disabled
      }
    }
  };
};

exports.styles = styles;
var defaultCheckedIcon = /*#__PURE__*/React.createElement(_RadioButtonIcon.default, {
  checked: true
});
var defaultIcon = /*#__PURE__*/React.createElement(_RadioButtonIcon.default, null);
var Radio = /*#__PURE__*/React.forwardRef(function Radio(props, ref) {
  var checkedProp = props.checked,
      classes = props.classes,
      _props$color = props.color,
      color = _props$color === void 0 ? 'secondary' : _props$color,
      nameProp = props.name,
      onChangeProp = props.onChange,
      _props$size = props.size,
      size = _props$size === void 0 ? 'medium' : _props$size,
      other = (0, _objectWithoutProperties2.default)(props, ["checked", "classes", "color", "name", "onChange", "size"]);
  var radioGroup = (0, _useRadioGroup.default)();
  var checked = checkedProp;
  var onChange = (0, _createChainedFunction.default)(onChangeProp, radioGroup && radioGroup.onChange);
  var name = nameProp;

  if (radioGroup) {
    if (typeof checked === 'undefined') {
      checked = radioGroup.value === props.value;
    }

    if (typeof name === 'undefined') {
      name = radioGroup.name;
    }
  }

  return /*#__PURE__*/React.createElement(_SwitchBase.default, (0, _extends2.default)({
    color: color,
    type: "radio",
    icon: /*#__PURE__*/React.cloneElement(defaultIcon, {
      fontSize: size === 'small' ? 'small' : 'default'
    }),
    checkedIcon: /*#__PURE__*/React.cloneElement(defaultCheckedIcon, {
      fontSize: size === 'small' ? 'small' : 'default'
    }),
    classes: {
      root: (0, _clsx.default)(classes.root, classes["color".concat((0, _capitalize.default)(color))]),
      checked: classes.checked,
      disabled: classes.disabled
    },
    name: name,
    checked: checked,
    onChange: onChange,
    ref: ref
  }, other));
});

var _default = (0, _withStyles.default)(styles, {
  name: 'MuiRadio'
})(Radio);

exports.default = _default;
});

var Radio = createCommonjsModule(function (module, exports) {



Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function get() {
    return _Radio.default;
  }
});

var _Radio = interopRequireDefault(Radio_1);
});

var __pika_web_default_export_for_treeshaking__ = /*@__PURE__*/getDefaultExportFromCjs(Radio);

export default __pika_web_default_export_for_treeshaking__;
