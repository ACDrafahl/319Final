import React from "react";
import "./Info.css";
import ProjectInfo from '../../components/InfoCard/ProjectInfo';
import LogoSearch from "../../components/LogoSearch/LogoSearch";
import NavIcons from "../../components/NavIcons/NavIcons";

const Info = () => {
  return (
    <div className="Home-center">
      <div className="Header-container">  {/* New container for header elements */}
        <div className="Left-side-chat">
          <LogoSearch />
        </div>
        <div className="Right-side-chat">
          <div style={{ width: "20rem", alignSelf: "flex-end" }}>
            <NavIcons />
          </div>
        </div>
      </div>
      
      <ProjectInfo />  {/* This will now be below the Header-container */}
    </div>
  );
};


export default Info;
