import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./HeaderNav.scss";

import { base64ToString } from "../../imageBufferDataToString";

const HeaderNav = ({ logout }) => {
  const [user, setUser] = useState(true);

  useEffect(() => {
    axios
      .get("/users/me")
      .then((res) => {
        const user = res.data.user;

        // set image if received
        if (user?.image) {
          user.image = base64ToString(user.image.image.data);
        }

        setUser(user);
      })
      .catch((err) => console.log(err?.response?.data?.err || err.request));
  }, []);

  return (
    <header className="header">
      <Link to="/">
        <header>
          <h1 className="logo">Banter</h1>
        </header>
      </Link>
      <nav className="navbar">
        <Link className="link" to="/users">
          Users
        </Link>
        <Link className="link" to={`/users/${user._id}`}>
          {user?.image && (
            <div className="profilePic">
              <div className="usersName">{user.fullName}</div>
              <img
                src={user?.image || "/empty_profile.png"}
                alt="profile pic"
                width="50"
                height="50"
              ></img>
            </div>
          )}
        </Link>
        <div className="link" onClick={logout}>
          Logout
        </div>
      </nav>
    </header>
  );
};

export { HeaderNav };
