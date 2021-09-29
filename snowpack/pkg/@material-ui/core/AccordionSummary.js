import { c as createCommonjsModule, g as getDefaultExportFromCjs } from '../../common/_commonjsHelpers-4f955397.js';
import { i as interopRequireDefault } from '../../common/interopRequireDefault-146b584c.js';
import { i as interopRequireWildcard } from '../../common/interopRequireWildcard-4c12a3b0.js';
import { _ as _extends_1, o as objectWithoutProperties } from '../../common/objectWithoutProperties-ecdc3a69.js';
import { a as compat_module } from '../../common/compat.module-44e2e532.js';
import { p as propTypes } from '../../common/hoist-non-react-statics.cjs-d740ad2c.js';
import { _ as __pika_web_default_export_for_treeshaking__$1 } from '../../common/clsx.m-e1755476.js';
import { w as withStyles_1 } from '../../common/withStyles-737200e5.js';
import { A as AccordionContext_1 } from '../../common/AccordionContext-0dc48847.js';
import { B as ButtonBase } from '../../common/ButtonBase-1fe6d2b0.js';
import { I as IconButton } from '../../common/IconButton-767ad7c8.js';
import '../../common/hooks.module-b65ed191.js';
import '../../common/preact.module-5693ab29.js';
import '../../common/defaultTheme-8bd8d426.js';
import '../../common/withStyles-f3a61d13.js';
import '../../common/ThemeProvider-2a63d6f4.js';
import '../../common/useForkRef-e701e1c9.js';
import '../../common/useIsFocusVisible-7e963aeb.js';
import '../../common/withStyles-92c33e5b.js';
import '../../common/TransitionGroupContext-717896c3.js';
import '../../common/capitalize-8176ed99.js';

var AccordionSummary_1 = createCommonjsModule(function (module, exports) {





Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.styles = void 0;

var _extends2 = interopRequireDefault(_extends_1);

var _objectWithoutProperties2 = interopRequireDefault(objectWithoutProperties);

var React = interopRequireWildcard(compat_module);

var _propTypes = interopRequireDefault(propTypes);

var _clsx = interopRequireDefault(__pika_web_default_export_for_treeshaking__$1);

var _ButtonBase = interopRequireDefault(ButtonBase);

var _IconButton = interopRequireDefault(IconButton);

var _withStyles = interopRequireDefault(withStyles_1);

var _AccordionContext = interopRequireDefault(AccordionContext_1);

/* eslint-disable jsx-a11y/aria-role */
var styles = function styles(theme) {
  var transition = {
    duration: theme.transitions.duration.shortest
  };
  return {
    /* Styles applied to the root element. */
    root: {
      display: 'flex',
      minHeight: 8 * 6,
      transition: theme.transitions.create(['min-height', 'background-color'], transition),
      padding: theme.spacing(0, 2),
      '&:hover:not($disabled)': {
        cursor: 'pointer'
      },
      '&$expanded': {
        minHeight: 64
      },
      '&$focused': {
        backgroundColor: theme.palette.action.focus
      },
      '&$disabled': {
        opacity: theme.palette.action.disabledOpacity
      }
    },

    /* Pseudo-class applied to the root element, children wrapper element and `IconButton` component if `expanded={true}`. */
    expanded: {},

    /* Pseudo-class applied to the root element if `focused={true}`. */
    focused: {},

    /* Pseudo-class applied to the root element if `disabled={true}`. */
    disabled: {},

    /* Styles applied to the children wrapper element. */
    content: {
      display: 'flex',
      flexGrow: 1,
      transition: theme.transitions.create(['margin'], transition),
      margin: '12px 0',
      '&$expanded': {
        margin: '20px 0'
      }
    },

    /* Styles applied to the `IconButton` component when `expandIcon` is supplied. */
    expandIcon: {
      transform: 'rotate(0deg)',
      transition: theme.transitions.create('transform', transition),
      '&:hover': {
        // Disable the hover effect for the IconButton,
        // because a hover effect should apply to the entire Expand button and
        // not only to the IconButton.
        backgroundColor: 'transparent'
      },
      '&$expanded': {
        transform: 'rotate(180deg)'
      }
    }
  };
};

exports.styles = styles;
var AccordionSummary = /*#__PURE__*/React.forwardRef(function AccordionSummary(props, ref) {
  var children = props.children,
      classes = props.classes,
      className = props.className,
      expandIcon = props.expandIcon,
      IconButtonProps = props.IconButtonProps,
      onBlur = props.onBlur,
      onClick = props.onClick,
      onFocusVisible = props.onFocusVisible,
      other = (0, _objectWithoutProperties2.default)(props, ["children", "classes", "className", "expandIcon", "IconButtonProps", "onBlur", "onClick", "onFocusVisible"]);

  var _React$useState = React.useState(false),
      focusedState = _React$useState[0],
      setFocusedState = _React$useState[1];

  var handleFocusVisible = function handleFocusVisible(event) {
    setFocusedState(true);

    if (onFocusVisible) {
      onFocusVisible(event);
    }
  };

  var handleBlur = function handleBlur(event) {
    setFocusedState(false);

    if (onBlur) {
      onBlur(event);
    }
  };

  var _React$useContext = React.useContext(_AccordionContext.default),
      _React$useContext$dis = _React$useContext.disabled,
      disabled = _React$useContext$dis === void 0 ? false : _React$useContext$dis,
      expanded = _React$useContext.expanded,
      toggle = _React$useContext.toggle;

  var handleChange = function handleChange(event) {
    if (toggle) {
      toggle(event);
    }

    if (onClick) {
      onClick(event);
    }
  };

  return /*#__PURE__*/React.createElement(_ButtonBase.default, (0, _extends2.default)({
    focusRipple: false,
    disableRipple: true,
    disabled: disabled,
    component: "div",
    "aria-expanded": expanded,
    className: (0, _clsx.default)(classes.root, className, disabled && classes.disabled, expanded && classes.expanded, focusedState && classes.focused),
    onFocusVisible: handleFocusVisible,
    onBlur: handleBlur,
    onClick: handleChange,
    ref: ref
  }, other), /*#__PURE__*/React.createElement("div", {
    className: (0, _clsx.default)(classes.content, expanded && classes.expanded)
  }, children), expandIcon && /*#__PURE__*/React.createElement(_IconButton.default, (0, _extends2.default)({
    className: (0, _clsx.default)(classes.expandIcon, expanded && classes.expanded),
    edge: "end",
    component: "div",
    tabIndex: null,
    role: null,
    "aria-hidden": true
  }, IconButtonProps), expandIcon));
});

var _default = (0, _withStyles.default)(styles, {
  name: 'MuiAccordionSummary'
})(AccordionSummary);

exports.default = _default;
});

var AccordionSummary = createCommonjsModule(function (module, exports) {



Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function get() {
    return _AccordionSummary.default;
  }
});

var _AccordionSummary = interopRequireDefault(AccordionSummary_1);
});

var __pika_web_default_export_for_treeshaking__ = /*@__PURE__*/getDefaultExportFromCjs(AccordionSummary);

export default __pika_web_default_export_for_treeshaking__;
