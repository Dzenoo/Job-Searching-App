import { TextField } from "@mui/material";
import React, { useEffect, useReducer } from "react";
import { validate } from "../../shared/util/Validators";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "Change": {
      return {
        ...state,
        value: action.value,
        isValid: validate(action.value, action.validators),
      };
    }
    default: {
      return state;
    }
  }
};
const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || "",
    isValid: props.initialValid || true,
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const inputChangeHandler = (e) => {
    dispatch({
      type: "Change",
      value: e.target.value,
      validators: props.validators,
    });
  };

  return props.element === "textarea" ? (
    <textarea
      className={props.className}
      type={props.type}
      value={inputState.value}
      id={props.id}
      onChange={inputChangeHandler}
      placeholder={props.placeholder}
    />
  ) : (
    <TextField
      type={props.type}
      value={inputState.value}
      id={props.id}
      error={!inputState.isValid}
      helperText={!inputState.isValid && props.errorText}
      margin="normal"
      onChange={inputChangeHandler}
      placeholder={props.placeholder}
    />
  );
};

export default Input;
