import {h} from "../../snowpack/pkg/preact.js";
import {Box, LinearProgress, makeStyles, TextField, Typography} from "../../snowpack/pkg/@material-ui/core.js";
import {useRef, useState} from "../../snowpack/pkg/preact/hooks.js";
export function DragDropUploader(props) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [validFiles, setValidFiles] = useState([]);
  const [unsupportedFiles, setUnsupportedFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const interceptAndDoNothing = (e) => e.preventDefault();
  const drop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length) {
      handle_files(files);
    }
  };
  const handle_files = (files) => {
    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      if (validate_file(file)) {
        if (props.allow_multiple) {
          setValidFiles((prevArray) => [...prevArray, file]);
        } else {
          setValidFiles([file]);
        }
      } else {
        setUnsupportedFiles((prevArray) => [...prevArray, file]);
        setErrorMessage("File type not permitted");
      }
    }
  };
  const validate_file = (file) => {
    if (props.valid_file_types.indexOf(file.type) === -1) {
      return false;
    }
    return true;
  };
  const filesSelected = () => {
    if (fileInputRef?.current?.files?.length) {
      handle_files(fileInputRef.current.files);
    }
  };
  const file_size = (size) => {
    if (size === 0)
      return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(size) / Math.log(k));
    return parseFloat((size / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };
  const file_type = (file_name) => {
    return file_name.substring(file_name.lastIndexOf(".") + 1, file_name.length) || file_name;
  };
  const fileInputRef = useRef();
  const progressRef = useRef();
  const classes = use_styles();
  return /* @__PURE__ */ h(Box, {
    className: `${classes.container}`
  }, /* @__PURE__ */ h(TextField, {
    inputProps: {
      accept: props.valid_file_types
    },
    inputRef: fileInputRef,
    multiple: props.allow_multiple || false,
    type: "file",
    variant: "outlined",
    onChange: filesSelected
  }), validFiles.map((file, i) => {
    return /* @__PURE__ */ h(Box, null, /* @__PURE__ */ h(LinearProgress, {
      variant: "determinate",
      color: "primary",
      value: 89,
      ref: progressRef
    }), /* @__PURE__ */ h(Typography, {
      component: "span",
      className: "file_type"
    }, file_type(file.name), " "), /* @__PURE__ */ h(Typography, {
      component: "span",
      className: "file_name"
    }, file.name, " "), /* @__PURE__ */ h(Typography, {
      component: "span",
      className: "file_size"
    }, file_size(file.size), " "));
  }));
}
const use_styles = makeStyles((theme) => ({
  container: {
    borderColor: "red",
    borderStyle: "dashed",
    borderWidth: 2,
    display: "flex",
    flexDirection: "column",
    height: "100%",
    justifyContent: "center",
    alignItems: "stretch"
  }
}));
