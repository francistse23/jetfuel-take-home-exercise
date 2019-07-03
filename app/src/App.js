import React, { useState, useEffect } from "react";

import "./App.css";

const plugCoUrl = "/public/take_home_sample_feed";

function App() {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    fetch(plugCoUrl)
      .then(res => res.json())
      .then(res => setCampaigns(res.campaigns))
      .catch(error => console.log(error));
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
        <img
          src={require("./images/play.png")}
          style={{ maxWidth: "40px", maxHeight: "40px" }}
        />
      </div>

      {/* Campaigns */}
      {campaigns.length === 0
        ? "Loading..."
        : campaigns.map(campaign => Campaign(campaign))}
    </div>
  );
}

function Campaign(data) {
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
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "0.25rem",
              position: "relative"
            }}
          >
            {/* <img
              className={
                medium.media_type === "video"
                  ? "campaign-body-cover-photo-video"
                  : "hidden"
              }
              src={require("./images/play.png")}
            /> */}
            <img
              className="campaign-body-cover-photo"
              src={`${medium.cover_photo_url}`}
            />

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
              <a href={medium.download_url} download style={{ width: "50%" }}>
                <img
                  className="campaign-body-icon"
                  src={require("./images/download.png")}
                  alt="Download Media"
                />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
