import {createMuiTheme} from "../../snowpack/pkg/@material-ui/core/styles.js";
const _default_theme_options = {
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920
    }
  },
  palette: {
    type: "light",
    primary: {
      main: "#cecece"
    },
    secondary: {
      main: "#b3e5fc"
    },
    warning: {
      main: "#e56717"
    },
    error: {
      main: "#b71c1c"
    },
    info: {
      main: "#26c6da"
    },
    success: {
      main: "#7cb342"
    }
  },
  spacing: 2,
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(",")
  }
};
export const DefaultTheme = createMuiTheme(_default_theme_options);
export const WarningTheme = createMuiTheme({...DefaultTheme, palette: {primary: _default_theme_options.palette?.warning, secondary: _default_theme_options.palette?.error}});
export const ErrorTheme = createMuiTheme({...DefaultTheme, palette: {primary: _default_theme_options.palette?.error}});
export const InfoTheme = createMuiTheme({...DefaultTheme, palette: {primary: _default_theme_options.palette?.info}});
export const SuccessTheme = createMuiTheme({...DefaultTheme, palette: {primary: _default_theme_options.palette?.success}});
