const template_path_for_react = (fragment) => `:${fragment}`;
export var REACT_PATH_IDS = {
  USER_UUID: "userUuid"
};
const template_path_for_hapi = (fragment) => `{${fragment}}`;
export var HAPI_PATH_IDS = {
  USERS_ID: "userId"
};
const _PATHS = class {
  static USER_ACCOUNT(userUuid = template_path_for_react(REACT_PATH_IDS.USER_UUID)) {
    return _PATHS._USER + `/${userUuid}`;
  }
};
export let PATHS = _PATHS;
PATHS.HOME = "/";
PATHS.ERROR = "/error/jfa092ksmf239qkvxcv32";
PATHS._SESSION_INDEX = "/session";
PATHS.SIGNIN = _PATHS._SESSION_INDEX + "/signin";
PATHS.SIGNOUT = _PATHS._SESSION_INDEX + "/signout";
PATHS.SIGNOUT_SUCCESS = _PATHS._SESSION_INDEX + "/signed-out";
PATHS._USER = "/user";
PATHS.USER_REGISTER = _PATHS._USER + "/register";
PATHS.LEGAL_INDEX = "/legal";
PATHS.LEGAL_COOKIE_POLICY = _PATHS.LEGAL_INDEX + "/cookie-policy";
PATHS.PROTECTED = "/protected";
PATHS._API_V1 = "/api/v1";
PATHS.API_V1 = {
  BOOTSTRAP: _PATHS._API_V1 + "/bootstrap",
  USER_REGISTER: _PATHS._API_V1 + "/user/register",
  SIGNIN: _PATHS._API_V1 + "/session/signin",
  SIGNOUT: _PATHS._API_V1 + "/session/signout",
  PROTECTED: _PATHS._API_V1 + "/protected",
  USERS_LIST: _PATHS._API_V1 + "/users/",
  USERS_GET: (userId = template_path_for_hapi(HAPI_PATH_IDS.USERS_ID)) => {
    return _PATHS._API_V1 + "/users/" + userId;
  },
  STATE: _PATHS._API_V1 + "/state/",
  SPECIALISED_STATE: _PATHS._API_V1 + "/specialised_state/"
};
