import { c as createCommonjsModule, b as getDefaultExportFromCjs } from '../../common/_commonjsHelpers-c99fd594.js';
import { i as interopRequireWildcard } from '../../common/interopRequireWildcard-b04711e4.js';
import { i as interopRequireDefault } from '../../common/interopRequireDefault-189da5a0.js';
import { a as esm } from '../../common/defaultTheme-606b3b98.js';
import { s as styled_1 } from '../../common/styled-5a476d2c.js';
import '../../common/withStyles-9ad24414.js';
import '../../common/hoist-non-react-statics.cjs-c36e250e.js';
import '../../common/compat.module-44e2e532.js';
import '../../common/hooks.module-b65ed191.js';
import '../../common/preact.module-5693ab29.js';
import '../../common/ThemeProvider-77286515.js';
import '../../common/objectWithoutProperties-4c19274d.js';

var Box_1 = createCommonjsModule(function (module, exports) {



Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.styleFunction = void 0;



var _styled = interopRequireDefault(styled_1);

var styleFunction = (0, esm.css)((0, esm.compose)(esm.borders, esm.display, esm.flexbox, esm.grid, esm.positions, esm.palette, esm.shadows, esm.sizing, esm.spacing, esm.typography));
/**
 * @ignore - do not document.
 */

exports.styleFunction = styleFunction;
var Box = (0, _styled.default)('div')(styleFunction, {
  name: 'MuiBox'
});
var _default = Box;
exports.default = _default;
});

var Box = createCommonjsModule(function (module, exports) {



Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function get() {
    return _Box.default;
  }
});
Object.defineProperty(exports, "styleFunction", {
  enumerable: true,
  get: function get() {
    return _Box.styleFunction;
  }
});

var _Box = interopRequireWildcard(Box_1);
});

var __pika_web_default_export_for_treeshaking__ = /*@__PURE__*/getDefaultExportFromCjs(Box);

export default __pika_web_default_export_for_treeshaking__;
