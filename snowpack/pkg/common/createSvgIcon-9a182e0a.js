import { c as createCommonjsModule } from './_commonjsHelpers-c99fd594.js';
import { c as capitalize } from './capitalize-fd5d619c.js';
import { a as createChainedFunction, c as createSvgIcon$1, u as useControlled, b as useId } from './unstable_useId-72319124.js';
import { d as debounce, o as ownerDocument, a as ownerWindow } from './ownerWindow-732ae746.js';
import { i as isMuiElement } from './isMuiElement-c285a3f2.js';
import { s as setRef, u as useForkRef } from './useForkRef-e701e1c9.js';
import { u as useEventCallback, a as useIsFocusVisible } from './useIsFocusVisible-7e963aeb.js';

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
  createSvgIcon: createSvgIcon$1,
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

var createSvgIcon = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function get() {
    return utils.createSvgIcon;
  }
});
});

export { createSvgIcon as c };
