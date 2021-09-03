import { c as createCommonjsModule } from './_commonjsHelpers-c99fd594.js';
import { i as interopRequireDefault } from './interopRequireDefault-189da5a0.js';
import { _ as _extends_1 } from './objectWithoutProperties-4c19274d.js';
import { d as defaultTheme_1, e as esm } from './defaultTheme-111296fa.js';

var styled_1 = createCommonjsModule(function (module, exports) {



Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = interopRequireDefault(_extends_1);



var _defaultTheme = interopRequireDefault(defaultTheme_1);

var styled = function styled(Component) {
  var componentCreator = (0, esm.styled)(Component);
  return function (style, options) {
    return componentCreator(style, (0, _extends2.default)({
      defaultTheme: _defaultTheme.default
    }, options));
  };
};

var _default = styled;
exports.default = _default;
});

export { styled_1 as s };
