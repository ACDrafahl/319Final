import React, { useEffect, useState } from "react";
import "./InfoCard.css";
import { UilPen } from "@iconscout/react-unicons";
import ProfileModal from "../ProfileModal/ProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as UserApi from "../../api/UserRequests.js";
import { logout } from "../../actions/AuthActions";
import { deleteUser } from "../../api/UserRequests.js";

const InfoCard = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const [modalOpened, setModalOpened] = useState(false);
  const profileUserId = params.id;
  const [profileUser, setProfileUser] = useState({});
  const { user } = useSelector((state) => state.authReducer.authData);

  const handleLogOut = () => {
    dispatch(logout());
  };

  const handleDelete = async () => {
    try {
      // Call the deleteUser function with the current user's ID
      await deleteUser(user._id);
      // Perform any additional actions after deletion if needed
      console.log("User deleted successfully");
      dispatch(logout());
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  useEffect(() => {
    const fetchProfileUser = async () => {
      if (profileUserId === user._id) {
        setProfileUser(user);
      } else {
        console.log("fetching");
        const profileUser = await UserApi.getUser(profileUserId);
        setProfileUser(profileUser);
        console.log(profileUser);
      }
    };
    fetchProfileUser();
  }, [user]);

  return (
    <div className="InfoCard">
      <div className="infoHead">
        <h4>Profile Info</h4>
        {/* IMPORTANT: THIS IS WHAT MAKES THE PEN ICON APPEAR */}
        {user._id === profileUserId ? (
          <div>
            <UilPen
              width="2rem"
              height="1.2rem"
              onClick={() => setModalOpened(true)}
            />
            <ProfileModal
              modalOpened={modalOpened}
              setModalOpened={setModalOpened}
              data={user}
            />
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="info">
        <span style={{ color: "lightgray" }}>
          <b>Name: </b>
        </span>
        <span style={{ color: "lightgray" }}>
          {user.firstname} {user.lastname}
        </span>
      </div>
      <div className="info">
        <span style={{ color: "lightgray" }}>
          <b>Phone #: </b>
        </span>
        <span style={{ color: "lightgray" }}>{profileUser.phoneNumber}</span>
      </div>
      <div className="info">
        <span style={{ color: "lightgray" }}>
          <b>Username: </b>
        </span>
        <span style={{ color: "lightgray" }}>{user.username}</span>
      </div>

      <button className="button logout-button" onClick={handleLogOut}>
        Log Out
      </button>
      <button className="button delete-button" onClick={handleDelete}>
        Delete Account
      </button>
    </div>
  );
};

export default InfoCard;