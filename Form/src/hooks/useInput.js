import { useState } from "react";
export function useInput(defaultValue, validationFn) {
  const [userValue, setUserValue] = useState(defaultValue);
  const [didEdit, setDidEdit] = useState(false);

  const isValidValue = validationFn(userValue);
  function handleChange(event) {
    setUserValue(event.target.value);
    setDidEdit(false);
  }
  function handleBlur() {
    setDidEdit(true);
  }
  return({
    value: userValue,
    handleBlur,
    handleChange,
    hasError: didEdit && !isValidValue,
  })
}
