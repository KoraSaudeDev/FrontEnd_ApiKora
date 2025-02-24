import { StylesConfig } from "react-select";

 export const customStyles: StylesConfig = {
    control: (provided, state) => ({
      ...provided,
      minHeight: 36,
      height: "100%",
      borderColor: state.isFocused ? "#007aff" : "#ddd",
      boxShadow: state.isFocused ? "0 0 0 1px #007aff" : "none",
      fontFamily: "Arial, sans-serif",
      fontSize: "1rem",
      "&:hover": {
        borderColor: "#007aff",
      },
    }),
    menu: (provided) => ({
      ...provided,
      fontFamily: "Arial, sans-serif",
      fontSize: "1rem",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#3E4676",
    }),
  };