import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
const User = ({ person }) => {
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useSelector((state) => state.authReducer.authData);
  const dispatch = useDispatch()
  
  const [following, setFollowing] = useState(
    person.followers.includes(user._id)
  );
  return (
    <div className="follower">
      <div>
        {/* <img
          src={
            publicFolder + person.profilePicture
              ? publicFolder + person.profilePicture
              : publicFolder + "defaultProfile.png"
          }
          alt="profile"
          className="followerImage"
        /> */}
        <div className="name">
          <span>{person.firstname}</span>
          <span>@{person.username}</span>
        </div>
      </div>
    </div>
  );
};

export default User;
