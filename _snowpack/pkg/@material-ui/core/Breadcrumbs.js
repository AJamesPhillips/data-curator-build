import { c as createCommonjsModule, g as getDefaultExportFromCjs } from '../../common/_commonjsHelpers-4f955397.js';
import { i as interopRequireDefault } from '../../common/interopRequireDefault-146b584c.js';
import { r as require$$2, i as interopRequireWildcard } from '../../common/interopRequireWildcard-c1ea7a9c.js';
import { _ as _extends_1, o as objectWithoutProperties, w as withStyles_1, c as colorManipulator } from '../../common/withStyles-36953188.js';
import { a as compat_module } from '../../common/compat.module-44e2e532.js';
import { T as Typography } from '../../common/Typography-e1c0da2a.js';
import { p as propTypes } from '../../common/hoist-non-react-statics.cjs-d740ad2c.js';
import { r as require$$4 } from '../../common/withStyles-bcfcfeac.js';
import { r as require$$5 } from '../../common/ButtonBase-4ceca0d6.js';
import '../../common/useIsFocusVisible-af419c25.js';
import '../../common/hooks.module-b65ed191.js';
import '../../common/preact.module-5693ab29.js';
import '../../common/ThemeProvider-b6c9c045.js';

var arrayLikeToArray = createCommonjsModule(function (module) {
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

module.exports = _arrayLikeToArray;
module.exports["default"] = module.exports, module.exports.__esModule = true;
});

var arrayWithoutHoles = createCommonjsModule(function (module) {
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return arrayLikeToArray(arr);
}

module.exports = _arrayWithoutHoles;
module.exports["default"] = module.exports, module.exports.__esModule = true;
});

var iterableToArray = createCommonjsModule(function (module) {
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

module.exports = _iterableToArray;
module.exports["default"] = module.exports, module.exports.__esModule = true;
});

var unsupportedIterableToArray = createCommonjsModule(function (module) {
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}

module.exports = _unsupportedIterableToArray;
module.exports["default"] = module.exports, module.exports.__esModule = true;
});

var nonIterableSpread = createCommonjsModule(function (module) {
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

module.exports = _nonIterableSpread;
module.exports["default"] = module.exports, module.exports.__esModule = true;
});

var toConsumableArray = createCommonjsModule(function (module) {
function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
}

module.exports = _toConsumableArray;
module.exports["default"] = module.exports, module.exports.__esModule = true;
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

var MoreHoriz = createCommonjsModule(function (module, exports) {





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
  d: "M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
}), 'MoreHoriz');

exports.default = _default;
});

var BreadcrumbCollapsed_1 = createCommonjsModule(function (module, exports) {





Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = interopRequireDefault(_extends_1);

var _objectWithoutProperties2 = interopRequireDefault(objectWithoutProperties);

var React = interopRequireWildcard(compat_module);

var _propTypes = interopRequireDefault(propTypes);

var _withStyles = interopRequireDefault(withStyles_1);



var _MoreHoriz = interopRequireDefault(MoreHoriz);

var _ButtonBase = interopRequireDefault(require$$5);

var styles = function styles(theme) {
  return {
    root: {
      display: 'flex',
      marginLeft: theme.spacing(0.5),
      marginRight: theme.spacing(0.5),
      backgroundColor: theme.palette.grey[100],
      color: theme.palette.grey[700],
      borderRadius: 2,
      cursor: 'pointer',
      '&:hover, &:focus': {
        backgroundColor: theme.palette.grey[200]
      },
      '&:active': {
        boxShadow: theme.shadows[0],
        backgroundColor: (0, colorManipulator.emphasize)(theme.palette.grey[200], 0.12)
      }
    },
    icon: {
      width: 24,
      height: 16
    }
  };
};
/**
 * @ignore - internal component.
 */


function BreadcrumbCollapsed(props) {
  var classes = props.classes,
      other = (0, _objectWithoutProperties2.default)(props, ["classes"]);
  return /*#__PURE__*/React.createElement(_ButtonBase.default, (0, _extends2.default)({
    component: "li",
    className: classes.root,
    focusRipple: true
  }, other), /*#__PURE__*/React.createElement(_MoreHoriz.default, {
    className: classes.icon
  }));
}

var _default = (0, _withStyles.default)(styles, {
  name: 'PrivateBreadcrumbCollapsed'
})(BreadcrumbCollapsed);

exports.default = _default;
});

var Breadcrumbs_1 = createCommonjsModule(function (module, exports) {





Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.styles = void 0;

var _extends2 = interopRequireDefault(_extends_1);

var _toConsumableArray2 = interopRequireDefault(toConsumableArray);

var _objectWithoutProperties2 = interopRequireDefault(objectWithoutProperties);

var React = interopRequireWildcard(compat_module);



var _propTypes = interopRequireDefault(propTypes);

var _clsx = interopRequireDefault(require$$4);

var _withStyles = interopRequireDefault(withStyles_1);

var _Typography = interopRequireDefault(Typography);

var _BreadcrumbCollapsed = interopRequireDefault(BreadcrumbCollapsed_1);

var styles = {
  /* Styles applied to the root element. */
  root: {},

  /* Styles applied to the ol element. */
  ol: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    padding: 0,
    margin: 0,
    listStyle: 'none'
  },

  /* Styles applied to the li element. */
  li: {},

  /* Styles applied to the separator element. */
  separator: {
    display: 'flex',
    userSelect: 'none',
    marginLeft: 8,
    marginRight: 8
  }
};
exports.styles = styles;

function insertSeparators(items, className, separator) {
  return items.reduce(function (acc, current, index) {
    if (index < items.length - 1) {
      acc = acc.concat(current, /*#__PURE__*/React.createElement("li", {
        "aria-hidden": true,
        key: "separator-".concat(index),
        className: className
      }, separator));
    } else {
      acc.push(current);
    }

    return acc;
  }, []);
}

var Breadcrumbs = /*#__PURE__*/React.forwardRef(function Breadcrumbs(props, ref) {
  var children = props.children,
      classes = props.classes,
      className = props.className,
      _props$component = props.component,
      Component = _props$component === void 0 ? 'nav' : _props$component,
      _props$expandText = props.expandText,
      expandText = _props$expandText === void 0 ? 'Show path' : _props$expandText,
      _props$itemsAfterColl = props.itemsAfterCollapse,
      itemsAfterCollapse = _props$itemsAfterColl === void 0 ? 1 : _props$itemsAfterColl,
      _props$itemsBeforeCol = props.itemsBeforeCollapse,
      itemsBeforeCollapse = _props$itemsBeforeCol === void 0 ? 1 : _props$itemsBeforeCol,
      _props$maxItems = props.maxItems,
      maxItems = _props$maxItems === void 0 ? 8 : _props$maxItems,
      _props$separator = props.separator,
      separator = _props$separator === void 0 ? '/' : _props$separator,
      other = (0, _objectWithoutProperties2.default)(props, ["children", "classes", "className", "component", "expandText", "itemsAfterCollapse", "itemsBeforeCollapse", "maxItems", "separator"]);

  var _React$useState = React.useState(false),
      expanded = _React$useState[0],
      setExpanded = _React$useState[1];

  var renderItemsBeforeAndAfter = function renderItemsBeforeAndAfter(allItems) {
    var handleClickExpand = function handleClickExpand(event) {
      setExpanded(true); // The clicked element received the focus but gets removed from the DOM.
      // Let's keep the focus in the component after expanding.

      var focusable = event.currentTarget.parentNode.querySelector('a[href],button,[tabindex]');

      if (focusable) {
        focusable.focus();
      }
    }; // This defends against someone passing weird input, to ensure that if all
    // items would be shown anyway, we just show all items without the EllipsisItem


    if (itemsBeforeCollapse + itemsAfterCollapse >= allItems.length) {

      return allItems;
    }

    return [].concat((0, _toConsumableArray2.default)(allItems.slice(0, itemsBeforeCollapse)), [/*#__PURE__*/React.createElement(_BreadcrumbCollapsed.default, {
      "aria-label": expandText,
      key: "ellipsis",
      onClick: handleClickExpand
    })], (0, _toConsumableArray2.default)(allItems.slice(allItems.length - itemsAfterCollapse, allItems.length)));
  };

  var allItems = React.Children.toArray(children).filter(function (child) {

    return /*#__PURE__*/React.isValidElement(child);
  }).map(function (child, index) {
    return /*#__PURE__*/React.createElement("li", {
      className: classes.li,
      key: "child-".concat(index)
    }, child);
  });
  return /*#__PURE__*/React.createElement(_Typography.default, (0, _extends2.default)({
    ref: ref,
    component: Component,
    color: "textSecondary",
    className: (0, _clsx.default)(classes.root, className)
  }, other), /*#__PURE__*/React.createElement("ol", {
    className: classes.ol
  }, insertSeparators(expanded || maxItems && allItems.length <= maxItems ? allItems : renderItemsBeforeAndAfter(allItems), classes.separator, separator)));
});

var _default = (0, _withStyles.default)(styles, {
  name: 'MuiBreadcrumbs'
})(Breadcrumbs);

exports.default = _default;
});

var Breadcrumbs = createCommonjsModule(function (module, exports) {



Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function get() {
    return _Breadcrumbs.default;
  }
});

var _Breadcrumbs = interopRequireDefault(Breadcrumbs_1);
});

var __pika_web_default_export_for_treeshaking__ = /*@__PURE__*/getDefaultExportFromCjs(Breadcrumbs);

export default __pika_web_default_export_for_treeshaking__;
