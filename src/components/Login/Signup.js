import axios from "axios";
import { useState } from "react";

const Signup = ({ closePopup }) => {
  const [errors, setErrors] = useState([]);
  const [message, setMessage] = useState(null);
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    // image: "",
  });

  const handleChange = (e) => {
    setInputs((old) => ({
      ...old,
      [e.target.name]:
        e.target.name === "image" ? e.target.files[0] : e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (let input in inputs) {
      formData.append([input], inputs[input]);
    }

    axios
      .post("/signup", formData, {})
      .then((result) => {
        setMessage(result?.data?.message);

        // rm conditional?
        if (result?.errors) {
          setErrors([...result?.errors]);
        } else {
          setErrors([]);
          setTimeout(() => closePopup(), 1000);
        }
      })
      .catch((err) => {
        console.log(err.response);
        setErrors([...err?.response?.data?.errors] || err?.response || err);
      });
  };

  return (
    <form
      className="signup-form"
      onSubmit={handleSubmit}
      encType="multipart/form-data"
    >
      <h2 className="form-title">Signup</h2>
      <img
        className="exit-btn"
        src="https://static.xx.fbcdn.net/rsrc.php/v3/yX/r/TdCEremeWv5.png"
        alt=""
        onClick={closePopup}
      />
      {errors.map((error, i) => (
        <div className="error" key={i}>
          - {error.msg}
        </div>
      ))}
      {message && <div className="message">{message}</div>}
      <div className="line" />
      {/* <label>
        <input
          type="text"
          name="firstName"
          value={inputs.firstName}
          onChange={handleChange}
          placeholder="First Name"
        />
      </label>
      <label>
        <input
          type="text"
          name="lastName"
          value={inputs.lastName}
          onChange={handleChange}
          placeholder="Last Name"
        />
      </label> */}
      <label>
        <input
          type="text"
          name="username"
          value={inputs.username}
          onChange={handleChange}
          placeholder="Username"
        />
      </label>
      <label>
        <input
          type="password"
          name="password"
          value={inputs.password}
          onChange={handleChange}
          placeholder="Password"
        />
      </label>
      <label>
        <input
          type="password"
          name="confirmPassword"
          value={inputs.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
        />
      </label>
      <label>
        Profile Picture
        <input type="file" name="image" onChange={handleChange}></input>
      </label>
      <button type="submit" className="signup-btn">
        Sign Up
      </button>
    </form>
  );
};

export { Signup };
