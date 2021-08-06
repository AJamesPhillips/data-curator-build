import { c as createCommonjsModule, g as getDefaultExportFromCjs } from '../../common/_commonjsHelpers-4f955397.js';
import { i as interopRequireDefault } from '../../common/interopRequireDefault-146b584c.js';
import { i as interopRequireWildcard } from '../../common/interopRequireWildcard-c1ea7a9c.js';
import { o as objectWithoutProperties, _ as _extends_1 } from '../../common/withStyles-36953188.js';
import { a as compat_module } from '../../common/compat.module-44e2e532.js';
import { p as propTypes } from '../../common/hoist-non-react-statics.cjs-d740ad2c.js';
import { r as require$$4 } from '../../common/withStyles-bcfcfeac.js';
import { s as styles } from '../../common/index-64123914.js';
import { u as utils } from '../../common/index-48024b82.js';
import { r as require$$5 } from '../../common/ButtonBase-4ceca0d6.js';
import '../../common/useIsFocusVisible-af419c25.js';
import '../../common/hooks.module-b65ed191.js';
import '../../common/preact.module-5693ab29.js';
import '../../common/ThemeProvider-b6c9c045.js';
import '../../common/unstable_useId-398bc8cb.js';

var ToggleButton_1 = createCommonjsModule(function (module, exports) {





Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.styles = void 0;

var _objectWithoutProperties2 = interopRequireDefault(objectWithoutProperties);

var _extends2 = interopRequireDefault(_extends_1);

var React = interopRequireWildcard(compat_module);

var _propTypes = interopRequireDefault(propTypes);

var _clsx = interopRequireDefault(require$$4);



var _ButtonBase = interopRequireDefault(require$$5);



// @inheritedComponent ButtonBase
var styles$1 = function styles$1(theme) {
  return {
    /* Styles applied to the root element. */
    root: (0, _extends2.default)({}, theme.typography.button, {
      boxSizing: 'border-box',
      borderRadius: theme.shape.borderRadius,
      padding: 11,
      border: "1px solid ".concat((0, styles.fade)(theme.palette.action.active, 0.12)),
      color: (0, styles.fade)(theme.palette.action.active, 0.38),
      '&$selected': {
        color: theme.palette.action.active,
        backgroundColor: (0, styles.fade)(theme.palette.action.active, 0.12),
        '&:hover': {
          backgroundColor: (0, styles.fade)(theme.palette.action.active, 0.15)
        },
        '& + &': {
          borderLeft: 0,
          marginLeft: 0
        }
      },
      '&$disabled': {
        color: (0, styles.fade)(theme.palette.action.disabled, 0.12)
      },
      '&:hover': {
        textDecoration: 'none',
        // Reset on mouse devices
        backgroundColor: (0, styles.fade)(theme.palette.text.primary, 0.05),
        '@media (hover: none)': {
          backgroundColor: 'transparent'
        },
        '&$disabled': {
          backgroundColor: 'transparent'
        }
      }
    }),

    /* Pseudo-class applied to the root element if `disabled={true}`. */
    disabled: {},

    /* Pseudo-class applied to the root element if `selected={true}`. */
    selected: {},

    /* Styles applied to the `label` wrapper element. */
    label: {
      width: '100%',
      // Ensure the correct width for iOS Safari
      display: 'inherit',
      alignItems: 'inherit',
      justifyContent: 'inherit'
    },

    /* Styles applied to the root element if `size="small"`. */
    sizeSmall: {
      padding: 7,
      fontSize: theme.typography.pxToRem(13)
    },

    /* Styles applied to the root element if `size="large"`. */
    sizeLarge: {
      padding: 15,
      fontSize: theme.typography.pxToRem(15)
    }
  };
};

exports.styles = styles$1;
var ToggleButton = /*#__PURE__*/React.forwardRef(function ToggleButton(props, ref) {
  var children = props.children,
      classes = props.classes,
      className = props.className,
      _props$disabled = props.disabled,
      disabled = _props$disabled === void 0 ? false : _props$disabled,
      _props$disableFocusRi = props.disableFocusRipple,
      disableFocusRipple = _props$disableFocusRi === void 0 ? false : _props$disableFocusRi,
      onChange = props.onChange,
      onClick = props.onClick,
      selected = props.selected,
      _props$size = props.size,
      size = _props$size === void 0 ? 'medium' : _props$size,
      value = props.value,
      other = (0, _objectWithoutProperties2.default)(props, ["children", "classes", "className", "disabled", "disableFocusRipple", "onChange", "onClick", "selected", "size", "value"]);

  var handleChange = function handleChange(event) {
    if (onClick) {
      onClick(event, value);

      if (event.isDefaultPrevented()) {
        return;
      }
    }

    if (onChange) {
      onChange(event, value);
    }
  };

  return /*#__PURE__*/React.createElement(_ButtonBase.default, (0, _extends2.default)({
    className: (0, _clsx.default)(classes.root, className, disabled && classes.disabled, selected && classes.selected, size !== 'medium' && classes["size".concat((0, utils.capitalize)(size))]),
    disabled: disabled,
    focusRipple: !disableFocusRipple,
    ref: ref,
    onClick: handleChange,
    onChange: onChange,
    value: value,
    "aria-pressed": selected
  }, other), /*#__PURE__*/React.createElement("span", {
    className: classes.label
  }, children));
});

var _default = (0, styles.withStyles)(styles$1, {
  name: 'MuiToggleButton'
})(ToggleButton);

exports.default = _default;
});

var ToggleButton = createCommonjsModule(function (module, exports) {



Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function get() {
    return _ToggleButton.default;
  }
});

var _ToggleButton = interopRequireDefault(ToggleButton_1);
});

var __pika_web_default_export_for_treeshaking__ = /*@__PURE__*/getDefaultExportFromCjs(ToggleButton);

export default __pika_web_default_export_for_treeshaking__;
