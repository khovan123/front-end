import { useState } from "react";

export default function Login() {
  const [userValue,setUserValue] = useState({
    email:'',
    password:'',
  });
  function handleChange(identifier,value){
    setUserValue(prev=>({
      ...prev,
    [identifier]:value,
    }))
  }
  function handleSubmit(event){
    event.preventDefault();
    console.log(userValue);
  }
  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" value={userValue.email} onChange={(event)=>handleChange('email',event.target.value)}/>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" value={userValue.password} onChange={(event)=>handleChange('password',event.target.value)}/>
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
