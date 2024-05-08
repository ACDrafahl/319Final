import React from "react";

import Home from "../../img/home.png";
import Noti from "../../img/noti.png";
import Comment from "../../img/comment.png";
import Info from "../../img/info.png";
import { UilSetting } from "@iconscout/react-unicons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const NavIcons = () => {
  const { user } = useSelector((state) => state.authReducer.authData);
  return (
    <div className="navIcons">
      <Link to={`/profile/${user._id}`}>
        <img src={Home} alt="" />
      </Link>
      {/* <img src={Noti} alt="" /> */}
      <Link to="../chat">
        <img src={Comment} alt="" />
      </Link>
      <Link to="../info">
        <img src={Info} alt="" />
      </Link>
    </div>
  );
};

export default NavIcons;
