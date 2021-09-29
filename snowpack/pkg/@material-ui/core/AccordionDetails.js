import { c as createCommonjsModule, g as getDefaultExportFromCjs } from '../../common/_commonjsHelpers-4f955397.js';
import { i as interopRequireDefault } from '../../common/interopRequireDefault-146b584c.js';
import { i as interopRequireWildcard } from '../../common/interopRequireWildcard-4c12a3b0.js';
import { _ as _extends_1, o as objectWithoutProperties } from '../../common/objectWithoutProperties-ecdc3a69.js';
import { a as compat_module } from '../../common/compat.module-44e2e532.js';
import { p as propTypes } from '../../common/hoist-non-react-statics.cjs-d740ad2c.js';
import { _ as __pika_web_default_export_for_treeshaking__$1 } from '../../common/clsx.m-e1755476.js';
import { w as withStyles_1 } from '../../common/withStyles-737200e5.js';
import '../../common/hooks.module-b65ed191.js';
import '../../common/preact.module-5693ab29.js';
import '../../common/defaultTheme-8bd8d426.js';
import '../../common/withStyles-f3a61d13.js';
import '../../common/ThemeProvider-2a63d6f4.js';

var AccordionDetails_1 = createCommonjsModule(function (module, exports) {





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

var styles = function styles(theme) {
  return {
    /* Styles applied to the root element. */
    root: {
      display: 'flex',
      padding: theme.spacing(1, 2, 2)
    }
  };
};

exports.styles = styles;
var AccordionDetails = /*#__PURE__*/React.forwardRef(function AccordionDetails(props, ref) {
  var classes = props.classes,
      className = props.className,
      other = (0, _objectWithoutProperties2.default)(props, ["classes", "className"]);
  return /*#__PURE__*/React.createElement("div", (0, _extends2.default)({
    className: (0, _clsx.default)(classes.root, className),
    ref: ref
  }, other));
});

var _default = (0, _withStyles.default)(styles, {
  name: 'MuiAccordionDetails'
})(AccordionDetails);

exports.default = _default;
});

var AccordionDetails = createCommonjsModule(function (module, exports) {



Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function get() {
    return _AccordionDetails.default;
  }
});

var _AccordionDetails = interopRequireDefault(AccordionDetails_1);
});

var __pika_web_default_export_for_treeshaking__ = /*@__PURE__*/getDefaultExportFromCjs(AccordionDetails);

export default __pika_web_default_export_for_treeshaking__;
