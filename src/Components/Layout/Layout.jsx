import React from "react";
import Menu from "../Menu/Menu";
import RightMenu from "../Menu-2/RightMenu";
import "./Layout.css";
import Home from "../../Pages/Home/Home";

const Layout = () => {
  return (
    <div>
      <div className="Slidebar-section">
        <div className="Slidebar-toggle">
          <div className="slidebar-toggel-icons"></div>
          <Menu />
        </div>

        <div className="center-bar-main">
          <Home />
        </div>

        <div className="Right-bar-main">
          <div className="Right-bar-Second">
            {/* <div>
              <div> */}
            <RightMenu />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
