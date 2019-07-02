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
      <div>menuIcon AppIcon</div>
      {campaigns.length === 0
        ? "Loading..."
        : campaigns.map(campaign => Campaign(campaign))}
    </div>
  );
}

function Campaign(data) {
  function copyLink() {}

  return (
    <div key={data.id} id={`jetfuel-exercise-${data.id}`}>
      <div
        style={{
          display: "flex",
          borderBottom: "1px solid gray"
        }}
      >
        <img
          style={{ maxWidth: "50px", maxHeight: "50px", borderRadius: "10px" }}
          src={`${data.campaign_icon_url}`}
          alt="Icon"
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "left"
          }}
        >
          <h4>{data.campaign_name}</h4>
          <h4>{data.pay_per_install} per install</h4>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          overflowX: "auto",
          padding: "1rem",
          backgroundColor: "ghostwhite"
        }}
      >
        {data.medias.map(medium => (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <img
              style={{ maxWidth: "75px", maxHeight: "150px" }}
              src={`${medium.cover_photo_url}`}
            />
            <div style={{ display: "flex" }}>
              <img
                src={require("./images/link.png")}
                alt="Copy Link"
                style={{ maxWidth: "25px", maxHeight: "25px" }}
              />
              <a href={`${medium.download_url}`} download>
                <img
                  src={require("./images/download.png")}
                  alt="Download Media"
                  style={{ maxWidth: "25px", maxHeight: "25px" }}
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
