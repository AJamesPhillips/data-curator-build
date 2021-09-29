import { c as createCommonjsModule } from './_commonjsHelpers-4f955397.js';
import { i as interopRequireDefault } from './interopRequireDefault-146b584c.js';
import { i as interopRequireWildcard } from './interopRequireWildcard-4c12a3b0.js';
import { a as compat_module } from './compat.module-44e2e532.js';

var FormControlContext_1 = createCommonjsModule(function (module, exports) {



Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useFormControl = useFormControl;
exports.default = void 0;

var React = interopRequireWildcard(compat_module);

/**
 * @ignore - internal component.
 */
var FormControlContext = React.createContext();

function useFormControl() {
  return React.useContext(FormControlContext);
}

var _default = FormControlContext;
exports.default = _default;
});

var useFormControl_1 = createCommonjsModule(function (module, exports) {





Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useFormControl;

var React = interopRequireWildcard(compat_module);

var _FormControlContext = interopRequireDefault(FormControlContext_1);

function useFormControl() {
  return React.useContext(_FormControlContext.default);
}
});

export { FormControlContext_1 as F, useFormControl_1 as u };
