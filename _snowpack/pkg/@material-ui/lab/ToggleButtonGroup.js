import { c as createCommonjsModule, g as getDefaultExportFromCjs } from '../../common/_commonjsHelpers-4f955397.js';
import { i as interopRequireDefault } from '../../common/interopRequireDefault-146b584c.js';
import { i as interopRequireWildcard } from '../../common/interopRequireWildcard-c1ea7a9c.js';
import { _ as _extends_1, o as objectWithoutProperties } from '../../common/withStyles-36953188.js';
import { a as compat_module } from '../../common/compat.module-44e2e532.js';
import '../../common/index-594ab5a5.js';
import { p as propTypes } from '../../common/hoist-non-react-statics.cjs-d740ad2c.js';
import { r as require$$4 } from '../../common/withStyles-bcfcfeac.js';
import { s as styles } from '../../common/index-64123914.js';
import { u as utils } from '../../common/index-48024b82.js';
import '../../common/useIsFocusVisible-af419c25.js';
import '../../common/hooks.module-b65ed191.js';
import '../../common/preact.module-5693ab29.js';
import '../../common/ThemeProvider-b6c9c045.js';
import '../../common/unstable_useId-398bc8cb.js';

var isValueSelected_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isValueSelected;

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
});

var ToggleButtonGroup_1 = createCommonjsModule(function (module, exports) {





Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.styles = void 0;

var _extends2 = interopRequireDefault(_extends_1);

var _objectWithoutProperties2 = interopRequireDefault(objectWithoutProperties);

var React = interopRequireWildcard(compat_module);



var _propTypes = interopRequireDefault(propTypes);

var _clsx = interopRequireDefault(require$$4);

var _isValueSelected = interopRequireDefault(isValueSelected_1);





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

exports.styles = styles$1;
var ToggleButtonGroup = /*#__PURE__*/React.forwardRef(function ToggleButton(props, ref) {
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
      other = (0, _objectWithoutProperties2.default)(props, ["children", "classes", "className", "exclusive", "onChange", "orientation", "size", "value"]);

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

  return /*#__PURE__*/React.createElement("div", (0, _extends2.default)({
    role: "group",
    className: (0, _clsx.default)(classes.root, className, orientation === 'vertical' && classes.vertical),
    ref: ref
  }, other), React.Children.map(children, function (child) {
    if (! /*#__PURE__*/React.isValidElement(child)) {
      return null;
    }

    return /*#__PURE__*/React.cloneElement(child, {
      className: (0, _clsx.default)(classes.grouped, classes["grouped".concat((0, utils.capitalize)(orientation))], child.props.className),
      onChange: exclusive ? handleExclusiveChange : handleChange,
      selected: child.props.selected === undefined ? (0, _isValueSelected.default)(child.props.value, value) : child.props.selected,
      size: child.props.size || size
    });
  }));
});

var _default = (0, styles.withStyles)(styles$1, {
  name: 'MuiToggleButtonGroup'
})(ToggleButtonGroup);

exports.default = _default;
});

var ToggleButtonGroup = createCommonjsModule(function (module, exports) {



Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function get() {
    return _ToggleButtonGroup.default;
  }
});

var _ToggleButtonGroup = interopRequireDefault(ToggleButtonGroup_1);
});

var __pika_web_default_export_for_treeshaking__ = /*@__PURE__*/getDefaultExportFromCjs(ToggleButtonGroup);

export default __pika_web_default_export_for_treeshaking__;
