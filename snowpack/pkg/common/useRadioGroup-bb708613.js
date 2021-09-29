import { c as createCommonjsModule } from './_commonjsHelpers-4f955397.js';
import { i as interopRequireDefault } from './interopRequireDefault-146b584c.js';
import { i as interopRequireWildcard } from './interopRequireWildcard-4c12a3b0.js';
import { a as compat_module } from './compat.module-44e2e532.js';

var RadioGroupContext_1 = createCommonjsModule(function (module, exports) {



Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = interopRequireWildcard(compat_module);

/**
 * @ignore - internal component.
 */
var RadioGroupContext = React.createContext();

var _default = RadioGroupContext;
exports.default = _default;
});

var useRadioGroup_1 = createCommonjsModule(function (module, exports) {





Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useRadioGroup;

var React = interopRequireWildcard(compat_module);

var _RadioGroupContext = interopRequireDefault(RadioGroupContext_1);

function useRadioGroup() {
  return React.useContext(_RadioGroupContext.default);
}
});

export { RadioGroupContext_1 as R, useRadioGroup_1 as u };
