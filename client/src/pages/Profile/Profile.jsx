import React from "react";
import PostSide from "../../components/PostSide/PostSide";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import ProfileLeft from "../../components/ProfileLeft/ProfileLeft";
import RightSide from "../../components/RightSide/RightSide";
import "./Profile.css";
import InfoCard from '../../components/InfoCard/InfoCard';
import LogoSearch from "../../components/LogoSearch/LogoSearch";

const Profile = () => {
  return (
    <div>
      <LogoSearch />
      <InfoCard />
    </div>
    
    // // <div className="Profile">
    // <div>
    //   <ProfileLeft />
    //   <div className="Profile-center">
    //     <ProfileCard location = 'profilePage'/>
    //   <PostSide/>
    //   </div>
    //   <RightSide/>
    // </div>
    // // </div>
  );
};

export default Profile;
