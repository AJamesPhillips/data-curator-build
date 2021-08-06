import { c as capitalize, s as setRef, b as useEventCallback, u as useForkRef, g as useIsFocusVisible } from './useIsFocusVisible-af419c25.js';
import { c as createChainedFunction, d as debounce, i as isMuiElement, o as ownerDocument, a as ownerWindow, u as useControlled, b as useId } from './unstable_useId-398bc8cb.js';
import { _ as _extends } from './withStyles-bcfcfeac.js';
import { R as React } from './compat.module-44e2e532.js';
import { r as require$$2 } from './interopRequireWildcard-c1ea7a9c.js';

/**
 * Private module reserved for @material-ui/x packages.
 */

function createSvgIcon(path, displayName) {
  var Component = function Component(props, ref) {
    return /*#__PURE__*/React.createElement(require$$2, _extends({
      ref: ref
    }, props), path);
  };

  Component.muiName = require$$2.muiName;
  return /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(Component));
}

function deprecatedPropType(validator, reason) {
  {
    return function () {
      return null;
    };
  }
}

function requirePropFactory(componentNameInError) {
  {
    return function () {
      return null;
    };
  }
}

function unsupportedProp(props, propName, componentName, location, propFullName) {
  {
    return null;
  }
}

var utils = /*#__PURE__*/Object.freeze({
  __proto__: null,
  capitalize: capitalize,
  createChainedFunction: createChainedFunction,
  createSvgIcon: createSvgIcon,
  debounce: debounce,
  deprecatedPropType: deprecatedPropType,
  isMuiElement: isMuiElement,
  ownerDocument: ownerDocument,
  ownerWindow: ownerWindow,
  requirePropFactory: requirePropFactory,
  setRef: setRef,
  unsupportedProp: unsupportedProp,
  useControlled: useControlled,
  useEventCallback: useEventCallback,
  useForkRef: useForkRef,
  unstable_useId: useId,
  useIsFocusVisible: useIsFocusVisible
});

export { utils as u };
