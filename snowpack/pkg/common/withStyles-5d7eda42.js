import { c as createCommonjsModule } from './_commonjsHelpers-c99fd594.js';
import { i as interopRequireDefault } from './interopRequireDefault-189da5a0.js';
import { _ as _extends_1 } from './objectWithoutProperties-4c19274d.js';
import { d as defaultTheme_1, e as esm } from './defaultTheme-111296fa.js';

var withStyles_1 = createCommonjsModule(function (module, exports) {



Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = interopRequireDefault(_extends_1);



var _defaultTheme = interopRequireDefault(defaultTheme_1);

function withStyles(stylesOrCreator, options) {
  return (0, esm.withStyles)(stylesOrCreator, (0, _extends2.default)({
    defaultTheme: _defaultTheme.default
  }, options));
}

var _default = withStyles;
exports.default = _default;
});

export { withStyles_1 as w };
