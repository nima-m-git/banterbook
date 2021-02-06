import axios from "axios";
import { useState } from "react";

import "./Login.scss";
import { Signup } from "./Signup";

const Login = ({ setHeaders }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [signupPopup, setSignupPopup] = useState(false);

  const checkCredentials = (e) => {
    e.preventDefault();
    axios
      .post("/login", {
        email,
        password,
      })
      .then((res) => {
        setError(res?.data?.message);
        const token = res?.data?.token;
        if (!!token) setHeaders(token);
      })
      .catch((err) => console.log(err.response || err));
  };

  return (
    <div className="login">
      <header>Nimabook</header>
      {signupPopup ? (
        <Signup closePopup={() => setSignupPopup(false)} />
      ) : (
        <form className="login-form" onSubmit={checkCredentials}>
          {error && <div className="error">- {error}</div>}
          <label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </label>
          <label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </label>
          <button className="submit-btn">Log In</button>
          <div className="line" />
          <button
            type="button"
            className="signup-btn"
            onClick={() => setSignupPopup(true)}
          >
            Sign Up
          </button>
        </form>
      )}
    </div>
  );
};

export { Login };
