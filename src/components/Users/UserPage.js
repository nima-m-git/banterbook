import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Post } from "../index";
import { ChangeImage } from "./ChangeImage";

// change to rel path
import { base64ToString } from "../../imageBufferDataToString";

const UserPage = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [changeImage, setChangeImage] = useState(false);

  const getUser = useCallback(async () => {
    try {
      const user = (await axios.get(`/users/${userId}`)).data.user;
      //  set image if received
      if (user?.image) {
        user.image = base64ToString(user.image.image.data);
      }

      const currentUser = (await axios.get(`/users/me`)).data.user;
      // set if current user
      setIsCurrentUser(currentUser._id === user._id);
      setUser(user);
    } catch (err) {
      setError(err.response?.data?.err || err.response);
    }
  }, [userId]);

  useEffect(() => getUser(), [getUser]);

  return (
    <div className="userPage">
      {isCurrentUser && changeImage && (
        <ChangeImage
          exit={() => setChangeImage(false)}
          refresh={getUser}
          priorImage={!!user.image}
        />
      )}
      {error && <div className="error">{error}</div>}
      {user && (
        <>
          <div className="profilePic" onClick={() => setChangeImage(true)}>
            <img
              src={user?.image || "/empty_profile.png"}
              alt="profile pic"
              width="80"
            ></img>
          </div>
          <div className="fullName">{user.fullName}</div>
          <div className="posts-container">
            {user.posts.length > 0 ? (
              user.posts.map((post) => (
                <Post {...{ post }} refresh={getUser} key={post._id} />
              ))
            ) : (
              <p>No posts to show</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export { UserPage };
