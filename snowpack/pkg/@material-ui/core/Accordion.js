import { c as createCommonjsModule, g as getDefaultExportFromCjs } from '../../common/_commonjsHelpers-4f955397.js';
import { i as interopRequireDefault } from '../../common/interopRequireDefault-146b584c.js';
import { i as interopRequireWildcard } from '../../common/interopRequireWildcard-4c12a3b0.js';
import { _ as _extends_1, o as objectWithoutProperties } from '../../common/objectWithoutProperties-ecdc3a69.js';
import { a as arrayWithHoles, u as unsupportedIterableToArray, n as nonIterableRest, s as slicedToArray, b as useControlled_1 } from '../../common/useControlled-f31ead54.js';
import { a as compat_module } from '../../common/compat.module-44e2e532.js';
import { a as require$$7, r as require$$8 } from '../../common/Paper-f5a9731e.js';
import { p as propTypes } from '../../common/hoist-non-react-statics.cjs-d740ad2c.js';
import { _ as __pika_web_default_export_for_treeshaking__$1 } from '../../common/clsx.m-e1755476.js';
import { w as withStyles_1 } from '../../common/withStyles-82e4af86.js';
import { A as AccordionContext_1 } from '../../common/AccordionContext-0dc48847.js';
import '../../common/hooks.module-b65ed191.js';
import '../../common/preact.module-5693ab29.js';
import '../../common/withStyles-db69868f.js';
import '../../common/withStyles-c88b9f29.js';
import '../../common/useForkRef-e701e1c9.js';
import '../../common/TransitionGroupContext-717896c3.js';
import '../../common/defaultTheme-bad95161.js';
import '../../common/ThemeProvider-88504205.js';

var iterableToArray = createCommonjsModule(function (module) {
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

module.exports = _iterableToArray;
module.exports["default"] = module.exports, module.exports.__esModule = true;
});

var toArray = createCommonjsModule(function (module) {
function _toArray(arr) {
  return arrayWithHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableRest();
}

module.exports = _toArray;
module.exports["default"] = module.exports, module.exports.__esModule = true;
});

var Accordion_1 = createCommonjsModule(function (module, exports) {





Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.styles = void 0;

var _extends2 = interopRequireDefault(_extends_1);

var _toArray2 = interopRequireDefault(toArray);

var _slicedToArray2 = interopRequireDefault(slicedToArray);

var _objectWithoutProperties2 = interopRequireDefault(objectWithoutProperties);

var React = interopRequireWildcard(compat_module);



var _propTypes = interopRequireDefault(propTypes);

var _clsx = interopRequireDefault(__pika_web_default_export_for_treeshaking__$1);



var _Collapse = interopRequireDefault(require$$7);

var _Paper = interopRequireDefault(require$$8);

var _withStyles = interopRequireDefault(withStyles_1);

var _AccordionContext = interopRequireDefault(AccordionContext_1);

var _useControlled3 = interopRequireDefault(useControlled_1);

var styles = function styles(theme) {
  var transition = {
    duration: theme.transitions.duration.shortest
  };
  return {
    /* Styles applied to the root element. */
    root: {
      position: 'relative',
      transition: theme.transitions.create(['margin'], transition),
      '&:before': {
        position: 'absolute',
        left: 0,
        top: -1,
        right: 0,
        height: 1,
        content: '""',
        opacity: 1,
        backgroundColor: theme.palette.divider,
        transition: theme.transitions.create(['opacity', 'background-color'], transition)
      },
      '&:first-child': {
        '&:before': {
          display: 'none'
        }
      },
      '&$expanded': {
        margin: '16px 0',
        '&:first-child': {
          marginTop: 0
        },
        '&:last-child': {
          marginBottom: 0
        },
        '&:before': {
          opacity: 0
        }
      },
      '&$expanded + &': {
        '&:before': {
          display: 'none'
        }
      },
      '&$disabled': {
        backgroundColor: theme.palette.action.disabledBackground
      }
    },

    /* Styles applied to the root element if `square={false}`. */
    rounded: {
      borderRadius: 0,
      '&:first-child': {
        borderTopLeftRadius: theme.shape.borderRadius,
        borderTopRightRadius: theme.shape.borderRadius
      },
      '&:last-child': {
        borderBottomLeftRadius: theme.shape.borderRadius,
        borderBottomRightRadius: theme.shape.borderRadius,
        // Fix a rendering issue on Edge
        '@supports (-ms-ime-align: auto)': {
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0
        }
      }
    },

    /* Styles applied to the root element if `expanded={true}`. */
    expanded: {},

    /* Styles applied to the root element if `disabled={true}`. */
    disabled: {}
  };
};

exports.styles = styles;
var Accordion = /*#__PURE__*/React.forwardRef(function Accordion(props, ref) {
  var childrenProp = props.children,
      classes = props.classes,
      className = props.className,
      _props$defaultExpande = props.defaultExpanded,
      defaultExpanded = _props$defaultExpande === void 0 ? false : _props$defaultExpande,
      _props$disabled = props.disabled,
      disabled = _props$disabled === void 0 ? false : _props$disabled,
      expandedProp = props.expanded,
      onChange = props.onChange,
      _props$square = props.square,
      square = _props$square === void 0 ? false : _props$square,
      _props$TransitionComp = props.TransitionComponent,
      TransitionComponent = _props$TransitionComp === void 0 ? _Collapse.default : _props$TransitionComp,
      TransitionProps = props.TransitionProps,
      other = (0, _objectWithoutProperties2.default)(props, ["children", "classes", "className", "defaultExpanded", "disabled", "expanded", "onChange", "square", "TransitionComponent", "TransitionProps"]);

  var _useControlled = (0, _useControlled3.default)({
    controlled: expandedProp,
    default: defaultExpanded,
    name: 'Accordion',
    state: 'expanded'
  }),
      _useControlled2 = (0, _slicedToArray2.default)(_useControlled, 2),
      expanded = _useControlled2[0],
      setExpandedState = _useControlled2[1];

  var handleChange = React.useCallback(function (event) {
    setExpandedState(!expanded);

    if (onChange) {
      onChange(event, !expanded);
    }
  }, [expanded, onChange, setExpandedState]);

  var _React$Children$toArr = React.Children.toArray(childrenProp),
      _React$Children$toArr2 = (0, _toArray2.default)(_React$Children$toArr),
      summary = _React$Children$toArr2[0],
      children = _React$Children$toArr2.slice(1);

  var contextValue = React.useMemo(function () {
    return {
      expanded: expanded,
      disabled: disabled,
      toggle: handleChange
    };
  }, [expanded, disabled, handleChange]);
  return /*#__PURE__*/React.createElement(_Paper.default, (0, _extends2.default)({
    className: (0, _clsx.default)(classes.root, className, expanded && classes.expanded, disabled && classes.disabled, !square && classes.rounded),
    ref: ref,
    square: square
  }, other), /*#__PURE__*/React.createElement(_AccordionContext.default.Provider, {
    value: contextValue
  }, summary), /*#__PURE__*/React.createElement(TransitionComponent, (0, _extends2.default)({
    in: expanded,
    timeout: "auto"
  }, TransitionProps), /*#__PURE__*/React.createElement("div", {
    "aria-labelledby": summary.props.id,
    id: summary.props['aria-controls'],
    role: "region"
  }, children)));
});

var _default = (0, _withStyles.default)(styles, {
  name: 'MuiAccordion'
})(Accordion);

exports.default = _default;
});

var Accordion = createCommonjsModule(function (module, exports) {



Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function get() {
    return _Accordion.default;
  }
});

var _Accordion = interopRequireDefault(Accordion_1);
});

var __pika_web_default_export_for_treeshaking__ = /*@__PURE__*/getDefaultExportFromCjs(Accordion);

export default __pika_web_default_export_for_treeshaking__;
