import { useRef, useState } from "react";

export default function Login() {
  const email = useRef();
  const password = useRef();
  function handleSubmit(event) {
    event.preventDefault();
    console.log("email: ", email.current.value);
    console.log("password: ", password.current.value);
  }
  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={email.current}
            ref={email}
            required
          />
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={password.current}
            ref={password}
            required
            minLength={6}
          />
        </div>
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
