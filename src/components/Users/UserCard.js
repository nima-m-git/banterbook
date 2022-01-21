import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";

import "./Users.scss";

const UserCard = ({ user }) => {
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const addFriend = (userId) => {
    axios
      .post(`/users/requests/${userId}`)
      .then((res) => {
        setMessage(res?.data?.msg);
      })
      .catch((err) => {
        setError(err.response.data.msg);
        console.log(err.response);
      });
  };

  const respondRequest = (requestResponse) => {
    axios
      .put(`/users/requests/${user._id}`, {
        requestResponse,
      })
      .then((res) => {
        setMessage(res?.data.msg);
      })
      .catch((err) => {
        setError(err.response.data.msg);
        console.log(err.response);
      });
  };

  const StatusBtn = (status) => {
    switch (status) {
      // allow request after denied, for the moment
      case "denied":
      case undefined:
        return (
          <button
            type="button"
            className="addFriend-status"
            onClick={() => addFriend(user._id)}
          >
            Add Friend
          </button>
        );
      case "received":
        return (
          <div className="respondFriend-status">
            <button
              type="button"
              className="confirmFriend-status"
              onClick={() => respondRequest("accepted")}
            >
              Confirm
            </button>
            <button
              type="button"
              className="rejectFriend-status"
              onClick={() => respondRequest("denied")}
            >
              Reject
            </button>
          </div>
        );
      case "accepted":
        return (
          <button type="button" className="friends-status">
            Friends
          </button>
        );
      case "pending":
        return (
          <button type="button" className="pending-status">
            Pending..
          </button>
        );
      default:
        return <button type="button" className="no-status"></button>;
    }
  };

  return (
    <div className="user-card">
      {message && <div className="message">{message}</div>}
      {error && <div className="error">{error}</div>}

      <div className="profilePic">
        <img
          src={user?.image || "/empty_profile.png"}
          alt="profile pic"
          height={50}
          width={50}
        />
      </div>
      <div className="profileInfo">
        <Link to={`/users/${user._id}`}>
          <div className="username">@{user?.username}</div>
        </Link>
        <div className="status">{StatusBtn(user.friendsStatus)}</div>
        <br></br>
      </div>
    </div>
  );
};

export { UserCard };
