import { c as createCommonjsModule, g as getDefaultExportFromCjs } from '../../common/_commonjsHelpers-4f955397.js';
import { i as interopRequireDefault } from '../../common/interopRequireDefault-146b584c.js';
import { i as interopRequireWildcard } from '../../common/interopRequireWildcard-4c12a3b0.js';
import { _ as _extends_1, o as objectWithoutProperties } from '../../common/objectWithoutProperties-ecdc3a69.js';
import { s as slicedToArray, b as useControlled_1 } from '../../common/useControlled-f31ead54.js';
import { k, a as compat_module } from '../../common/compat.module-44e2e532.js';
import { p as propTypes } from '../../common/hoist-non-react-statics.cjs-d740ad2c.js';
import { R as RadioGroupContext_1, u as useRadioGroup_1 } from '../../common/useRadioGroup-bb708613.js';
import { e as _objectWithoutProperties, _ as _extends } from '../../common/withStyles-f3a61d13.js';
import { _ as __pika_web_default_export_for_treeshaking__$1 } from '../../common/clsx.m-e1755476.js';
import { w as withStyles } from '../../common/withStyles-92c33e5b.js';
import { v } from '../../common/preact.module-5693ab29.js';
import '../../common/hooks.module-b65ed191.js';

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
    className: __pika_web_default_export_for_treeshaking__$1(classes.root, className, row && classes.row),
    ref: ref
  }, other));
});
var require$$5 = withStyles(styles, {
  name: 'MuiFormGroup'
})(FormGroup);

var setRef_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setRef;

// TODO v5: consider to make it private
function setRef(ref, value) {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
}
});

var useForkRef_1 = createCommonjsModule(function (module, exports) {





Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useForkRef;

var React = interopRequireWildcard(compat_module);

var _setRef = interopRequireDefault(setRef_1);

function useForkRef(refA, refB) {
  /**
   * This will create a new function if the ref props change and are defined.
   * This means react will call the old forkRef with `null` and the new forkRef
   * with the ref. Cleanup naturally emerges from this behavior
   */
  return React.useMemo(function () {
    if (refA == null && refB == null) {
      return null;
    }

    return function (refValue) {
      (0, _setRef.default)(refA, refValue);
      (0, _setRef.default)(refB, refValue);
    };
  }, [refA, refB]);
}
});

var unstable_useId = createCommonjsModule(function (module, exports) {



Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useId;

var React = interopRequireWildcard(compat_module);

/**
 * Private module reserved for @material-ui/x packages.
 */
function useId(idOverride) {
  var _React$useState = React.useState(idOverride),
      defaultId = _React$useState[0],
      setDefaultId = _React$useState[1];

  var id = idOverride || defaultId;
  React.useEffect(function () {
    if (defaultId == null) {
      // Fallback to this default id when possible.
      // Use the random value for client-side rendering only.
      // We can't use it server-side.
      setDefaultId("mui-".concat(Math.round(Math.random() * 1e5)));
    }
  }, [defaultId]);
  return id;
}
});

var RadioGroup_1 = createCommonjsModule(function (module, exports) {





Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = interopRequireDefault(_extends_1);

var _slicedToArray2 = interopRequireDefault(slicedToArray);

var _objectWithoutProperties2 = interopRequireDefault(objectWithoutProperties);

var React = interopRequireWildcard(compat_module);

var _propTypes = interopRequireDefault(propTypes);

var _FormGroup = interopRequireDefault(require$$5);

var _useForkRef = interopRequireDefault(useForkRef_1);

var _useControlled3 = interopRequireDefault(useControlled_1);

var _RadioGroupContext = interopRequireDefault(RadioGroupContext_1);

var _unstable_useId = interopRequireDefault(unstable_useId);

var RadioGroup = /*#__PURE__*/React.forwardRef(function RadioGroup(props, ref) {
  var actions = props.actions,
      children = props.children,
      nameProp = props.name,
      valueProp = props.value,
      onChange = props.onChange,
      other = (0, _objectWithoutProperties2.default)(props, ["actions", "children", "name", "value", "onChange"]);
  var rootRef = React.useRef(null);

  var _useControlled = (0, _useControlled3.default)({
    controlled: valueProp,
    default: props.defaultValue,
    name: 'RadioGroup'
  }),
      _useControlled2 = (0, _slicedToArray2.default)(_useControlled, 2),
      value = _useControlled2[0],
      setValue = _useControlled2[1];

  React.useImperativeHandle(actions, function () {
    return {
      focus: function focus() {
        var input = rootRef.current.querySelector('input:not(:disabled):checked');

        if (!input) {
          input = rootRef.current.querySelector('input:not(:disabled)');
        }

        if (input) {
          input.focus();
        }
      }
    };
  }, []);
  var handleRef = (0, _useForkRef.default)(ref, rootRef);

  var handleChange = function handleChange(event) {
    setValue(event.target.value);

    if (onChange) {
      onChange(event, event.target.value);
    }
  };

  var name = (0, _unstable_useId.default)(nameProp);
  return /*#__PURE__*/React.createElement(_RadioGroupContext.default.Provider, {
    value: {
      name: name,
      onChange: handleChange,
      value: value
    }
  }, /*#__PURE__*/React.createElement(_FormGroup.default, (0, _extends2.default)({
    role: "radiogroup",
    ref: handleRef
  }, other), children));
});
var _default = RadioGroup;
exports.default = _default;
});

var RadioGroup = createCommonjsModule(function (module, exports) {



Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function get() {
    return _RadioGroup.default;
  }
});
Object.defineProperty(exports, "useRadioGroup", {
  enumerable: true,
  get: function get() {
    return _useRadioGroup.default;
  }
});

var _RadioGroup = interopRequireDefault(RadioGroup_1);

var _useRadioGroup = interopRequireDefault(useRadioGroup_1);
});

var __pika_web_default_export_for_treeshaking__ = /*@__PURE__*/getDefaultExportFromCjs(RadioGroup);

export default __pika_web_default_export_for_treeshaking__;
