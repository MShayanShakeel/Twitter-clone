import React from "react";
import "./RightMenu.css";
import { MdMoreHoriz } from "react-icons/md";

const RightMenu = () => {
  const randercomponent = () => {
    const trandinfTopics = [];
    for (var i = 0; i < 15; i++) {
      trandinfTopics.push(
        <h4 key={i} style={{ position: "relative" }}>
          Icc-Cricket-Office
          <MdMoreHoriz style={{ position: "absolute", right: "0" }} />
        </h4>
      );
    }
    return trandinfTopics;
  };

  return (
    <>
      <div className="main-right-menu">
        <div className="container second-right-menu">
          {/* SEARCH FIELD CODE */}
          <div class="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search..."
            />
            <button className="search-button">
              <svg viewBox="0 0 24 24" aria-hidden="true" class="search-icon">
                <g>
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M21.364 19.95l-4.788-4.789a7.5 7.5 0 1 0-1.414 1.414l4.788 4.789a1 1 0 0 0 1.415-1.414zM5 14.5a7.5 7.5 0 1 1 13.297-4.5H18a5 5 0 1 0-1 9.901v.001H5V14.5z" />
                </g>
              </svg>
            </button>
          </div>
          {/* SUBSCRIPTION component CODE */}
          <div className="Subscription-main">
            <div className="Subscription-second">
              <h1>Subscribe Premiun</h1>
              <h4>
                Subscribe to unlock new features and if eligible, receive a
                share of ads revenue.
              </h4>
              <button className="Subscriber-btn btn btn-dark">Subscribe</button>
            </div>
          </div>

          {/* Trending Topic component CODE */}
          <div className="Subscription-main" style={{ marginTop: "1.5rem" }}>
              <h1 style={{padding : "10px 0px 0px 3px"}}>Trending Topics</h1>
            <div className="Subscription-second Tranding-topic-main">
              <div className="tranding-topics-contant">
              {randercomponent()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RightMenu;
