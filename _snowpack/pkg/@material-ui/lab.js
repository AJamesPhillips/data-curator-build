import { _ as _extends, c as _objectWithoutProperties, r as require$$4 } from '../common/withStyles-bcfcfeac.js';
import { k, N, r as rn, u as un } from '../common/compat.module-44e2e532.js';
import '../common/hoist-non-react-statics.cjs-d740ad2c.js';
import { s as styles$2 } from '../common/index-64123914.js';
import { c as capitalize } from '../common/useIsFocusVisible-af419c25.js';
import { r as require$$5 } from '../common/ButtonBase-4ceca0d6.js';
import { v } from '../common/preact.module-5693ab29.js';
import '../common/index-594ab5a5.js';
import '../common/hooks.module-b65ed191.js';
import '../common/_commonjsHelpers-4f955397.js';
import '../common/interopRequireDefault-146b584c.js';
import '../common/withStyles-36953188.js';
import '../common/ThemeProvider-b6c9c045.js';

var styles = function styles(theme) {
  return {
    /* Styles applied to the root element. */
    root: _extends({}, theme.typography.button, {
      boxSizing: 'border-box',
      borderRadius: theme.shape.borderRadius,
      padding: 11,
      border: "1px solid ".concat(styles$2.fade(theme.palette.action.active, 0.12)),
      color: styles$2.fade(theme.palette.action.active, 0.38),
      '&$selected': {
        color: theme.palette.action.active,
        backgroundColor: styles$2.fade(theme.palette.action.active, 0.12),
        '&:hover': {
          backgroundColor: styles$2.fade(theme.palette.action.active, 0.15)
        },
        '& + &': {
          borderLeft: 0,
          marginLeft: 0
        }
      },
      '&$disabled': {
        color: styles$2.fade(theme.palette.action.disabled, 0.12)
      },
      '&:hover': {
        textDecoration: 'none',
        // Reset on mouse devices
        backgroundColor: styles$2.fade(theme.palette.text.primary, 0.05),
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
var ToggleButton = /*#__PURE__*/k(function ToggleButton(props, ref) {
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
      other = _objectWithoutProperties(props, ["children", "classes", "className", "disabled", "disableFocusRipple", "onChange", "onClick", "selected", "size", "value"]);

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

  return /*#__PURE__*/v(require$$5, _extends({
    className: require$$4(classes.root, className, disabled && classes.disabled, selected && classes.selected, size !== 'medium' && classes["size".concat(capitalize(size))]),
    disabled: disabled,
    focusRipple: !disableFocusRipple,
    ref: ref,
    onClick: handleChange,
    onChange: onChange,
    value: value,
    "aria-pressed": selected
  }, other), /*#__PURE__*/v("span", {
    className: classes.label
  }, children));
});
var ToggleButton$1 = styles$2.withStyles(styles, {
  name: 'MuiToggleButton'
})(ToggleButton);

// Determine if the toggle button value matches, or is contained in, the
// candidate group value.
function isValueSelected(value, candidate) {
  if (candidate === undefined || value === undefined) {
    return false;
  }

  if (Array.isArray(candidate)) {
    return candidate.indexOf(value) >= 0;
  }

  return value === candidate;
}

var styles$1 = function styles(theme) {
  return {
    /* Styles applied to the root element. */
    root: {
      display: 'inline-flex',
      borderRadius: theme.shape.borderRadius
    },

    /* Styles applied to the root element if `orientation="vertical"`. */
    vertical: {
      flexDirection: 'column'
    },

    /* Styles applied to the children. */
    grouped: {},

    /* Styles applied to the children if `orientation="horizontal"`. */
    groupedHorizontal: {
      '&:not(:first-child)': {
        marginLeft: -1,
        borderLeft: '1px solid transparent',
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0
      },
      '&:not(:last-child)': {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0
      }
    },

    /* Styles applied to the children if `orientation="vertical"`. */
    groupedVertical: {
      '&:not(:first-child)': {
        marginTop: -1,
        borderTop: '1px solid transparent',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0
      },
      '&:not(:last-child)': {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0
      }
    }
  };
};
var ToggleButtonGroup = /*#__PURE__*/k(function ToggleButton(props, ref) {
  var children = props.children,
      classes = props.classes,
      className = props.className,
      _props$exclusive = props.exclusive,
      exclusive = _props$exclusive === void 0 ? false : _props$exclusive,
      onChange = props.onChange,
      _props$orientation = props.orientation,
      orientation = _props$orientation === void 0 ? 'horizontal' : _props$orientation,
      _props$size = props.size,
      size = _props$size === void 0 ? 'medium' : _props$size,
      value = props.value,
      other = _objectWithoutProperties(props, ["children", "classes", "className", "exclusive", "onChange", "orientation", "size", "value"]);

  var handleChange = function handleChange(event, buttonValue) {
    if (!onChange) {
      return;
    }

    var index = value && value.indexOf(buttonValue);
    var newValue;

    if (value && index >= 0) {
      newValue = value.slice();
      newValue.splice(index, 1);
    } else {
      newValue = value ? value.concat(buttonValue) : [buttonValue];
    }

    onChange(event, newValue);
  };

  var handleExclusiveChange = function handleExclusiveChange(event, buttonValue) {
    if (!onChange) {
      return;
    }

    onChange(event, value === buttonValue ? null : buttonValue);
  };

  return /*#__PURE__*/v("div", _extends({
    role: "group",
    className: require$$4(classes.root, className, orientation === 'vertical' && classes.vertical),
    ref: ref
  }, other), N.map(children, function (child) {
    if (! /*#__PURE__*/rn(child)) {
      return null;
    }

    return /*#__PURE__*/un(child, {
      className: require$$4(classes.grouped, classes["grouped".concat(capitalize(orientation))], child.props.className),
      onChange: exclusive ? handleExclusiveChange : handleChange,
      selected: child.props.selected === undefined ? isValueSelected(child.props.value, value) : child.props.selected,
      size: child.props.size || size
    });
  }));
});
var ToggleButtonGroup$1 = styles$2.withStyles(styles$1, {
  name: 'MuiToggleButtonGroup'
})(ToggleButtonGroup);

export { ToggleButton$1 as ToggleButton, ToggleButtonGroup$1 as ToggleButtonGroup };
