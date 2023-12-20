import { isEmail, isNotEmpty, hasMinLength } from "../util/validation.js";
import Input from "./Input.jsx";
import { useInput } from "../hooks/useInput.js";
export default function Login() {
  const {
    value: emailValue,
    handleBlur: handleEmailBlur,
    handleChange: handleEmailChange,
    hasError: emailHasError,
  } = useInput("", (value) => {
    return isEmail(value) && isNotEmpty(value);
  });

  const {
    value: passwordValue,
    handleBlur: handlePasswordBlur,
    handleChange: handlePasswordChange,
    hasError: passwordHasError,
  } = useInput("", (value) => {
    return hasMinLength(value, 6);
  });

  function handleSubmit(event) {
    event.preventDefault();
    if (
      emailHasError ||
      passwordHasError ||
      emailValue === "" ||
      passwordValue === ""
    ) {
      return;
    }
    console.log(emailValue, passwordValue);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <Input
          label={"Email"}
          id={"email"}
          type="email"
          name="email"
          value={emailValue}
          onChange={handleEmailChange}
          onBlur={handleEmailBlur}
          error={emailHasError && "Please enter a valid email."}
        />

        <Input
          label={"Password"}
          id={"password"}
          type="password"
          name="password"
          value={passwordValue}
          onChange={handlePasswordChange}
          onBlur={handlePasswordBlur}
          error={passwordHasError && "Please enter a valid password."}
        />
      </div>

      <p className="form-actions">
        <button type="reset" className="button button-flat">
          Reset
        </button>
        <button type="submit" className="button">
          Login
        </button>
      </p>
    </form>
  );
}
