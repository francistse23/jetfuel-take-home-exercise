import React, { useState, useEffect } from "react";

import "./App.css";

const plugCoUrl = "/public/take_home_sample_feed";

function App() {
  const [campaigns, setCampaigns] = useState([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    fetch(plugCoUrl)
      .then(res => res.json())
      .then(res => {
        setCampaigns(res.campaigns);
        setFetching(false);
        console.log(fetching);
      })
      .catch(error => console.log(error.message));
  }, []);

  return (
    <div className="App">
      {/* NavBar */}
      <div className="navbar">
        <img
          src={require("./images/hamburger-menu.png")}
          alt="menu"
          style={{ maxWidth: "20px", maxHeight: "20px", padding: "1rem" }}
        />
        <img
          src={require("./images/plugco.png")}
          alt="Plug Co"
          style={{ maxWidth: "40px", maxHeight: "40px", margin: "1rem" }}
        />
        {/* White/Blank spaceholder */}
        <img
          src={require("./images/play.png")}
          style={{ maxWidth: "40px", maxHeight: "40px" }}
        />
      </div>

      {/* Campaigns */}
      {fetching === true
        ? "Loading..."
        : campaigns.length === 0 && fetching === false
        ? "Uh oh... Something went wrong. Please refresh."
        : campaigns.map(campaign => <Campaign {...campaign} />)}
    </div>
  );
}

function Campaign(data) {
  return (
    <div key={data.id}>
      {/* Campaign info & pay per install */}
      <div className="campaign-header">
        <img
          className="campaign-icon"
          src={`${data.campaign_icon_url}`}
          alt="Campaign Icon"
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "left"
          }}
        >
          <div style={{ fontWeight: 700 }}>{data.campaign_name}</div>
          <div style={{ color: "green" }}>
            <strong>{data.pay_per_install}</strong> per install
          </div>
        </div>
      </div>

      {/* Campaign body */}
      <div className="campaign-body">
        {data.medias.map(medium => (
          <CampaignVideo data={data} medium={medium} />
        ))}
      </div>
    </div>
  );
}

function CampaignVideo({ data, medium }) {
  const [playState, setPlayState] = useState("pause");

  function copyLink(id) {
    const area = document.createElement("textarea");
    const link = document
      .getElementById(`jetfuel-tracking-link-${id}`)
      .getAttribute("value");
    area.value = link;
    document.body.appendChild(area);
    area.select();
    document.execCommand("copy");
    document.body.removeChild(area);
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        margin: "0.25rem"
      }}
    >
      <div style={{ position: "relative", borderRadius: "5px" }}>
        {/* Play button overlay */}
        {playState === "pause" ? (
          <div>
            <div
              className={
                medium.media_type === "video"
                  ? "campaign-body-cover-photo video"
                  : "hidden"
              }
            >
              <svg
                viewBox="-150 -350 500 500"
                alt="Play video"
                onClick={() => setPlayState("play")}
              >
                <polygon points="70, 55 70, 145 145, 100" fill="#FFF" />
              </svg>
            </div>

            <img
              className="campaign-body-cover-photo"
              src={`${medium.cover_photo_url}`}
              alt="Cover Photo"
            />
          </div>
        ) : (
          <video
            src={medium.download_url}
            autoplay
            controls
            controlsList="nodownload"
            muted
            preload="auto"
            style={{ width: "100px", height: "180px", borderRadius: "5px" }}
          />
        )}
      </div>

      {/* Link & Download Icons */}
      <div className="campaign-body-icon-menu">
        <a
          style={{
            width: "50%",
            borderRight: "1px solid aliceblue"
          }}
          id={`jetfuel-tracking-link-${data.id}`}
          onClick={() => copyLink(data.id)}
          value={medium.tracking_link}
        >
          <img
            className="campaign-body-icon"
            src={require("./images/link.png")}
            alt={medium.tracking_link}
          />
        </a>
        <a
          href={medium.download_url}
          download={`${data.campaign_name}-${data.id}`}
          style={{ width: "50%" }}
        >
          <img
            className="campaign-body-icon"
            src={require("./images/download.png")}
            alt="Download Media"
          />
        </a>
      </div>
    </div>
  );
}

export default App;
