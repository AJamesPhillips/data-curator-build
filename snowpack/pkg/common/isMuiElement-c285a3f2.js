import { r as rn } from './compat.module-44e2e532.js';

function isMuiElement(element, muiNames) {
  return /*#__PURE__*/rn(element) && muiNames.indexOf(element.type.muiName) !== -1;
}

export { isMuiElement as i };
