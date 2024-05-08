import React, { useEffect, useState } from "react";
import "./InfoCard.css";
import ProfileModal from "../ProfileModal/ProfileModal.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as UserApi from "../../api/UserRequests.js";
import { logout } from "../../actions/AuthActions.js";


const ProjectInfo = () => {
  const dispatch = useDispatch()
  const params = useParams();
  const [modalOpened, setModalOpened] = useState(false);
  const profileUserId = params.id;
  const [profileUser, setProfileUser] = useState({});
  const { user } = useSelector((state) => state.authReducer.authData);


  const handleLogOut = ()=> {
    dispatch(logout())
  }


  useEffect(() => {
    const fetchProfileUser = async () => {
      if (profileUserId === user._id) {
        setProfileUser(user);
      } else {
        console.log("fetching")
        const profileUser = await UserApi.getUser(profileUserId);
        setProfileUser(profileUser);
        console.log(profileUser)
      }
    };
    fetchProfileUser();
  }, [user]);

  return (
    <div className="InfoCard">
      <div className="infoHead">
        <h4>Project Info</h4>
      </div>

      <div className="info">
        <span style={{ color: "lightgray" }}>
          <b>COM S 319 Construction of User Interfaces, Spring 2024</b>
        </span>
      </div>
      <div className="info">
        <span style={{ color: "lightgray" }}>
          <b>Date: </b>
        </span>
        <span style={{ color: "lightgray" }}>May 7, 2024</span>
      </div>
      <div className="info">
        <span style={{ color: "lightgray" }}>
          <b>Group members: </b>
        </span>
        <span style={{ color: "lightgray" }}>Michael Rubenacker; mrube@iastate.edu and Andy Drafahl; acd7@iastate.edu</span>
      </div>
      <div className="info">
        <span style={{ color: "lightgray" }}>
          <b>Instructor: </b>
        </span>
        <span style={{ color: "lightgray" }}>Dr. Abraham N. Aldaco Gastelum; aaldaco@iastate.edu</span>
      </div>

      <button className="button logout-button" onClick={handleLogOut}>Log Out</button>
    </div>
  );
};

export default ProjectInfo;