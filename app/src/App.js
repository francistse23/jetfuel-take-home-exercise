import React, { useState, useEffect } from "react";

import "./App.css";

const plugCoUrl = "/public/take_home_sample_feed";

function App() {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    fetch(plugCoUrl)
      .then(res => res.json())
      .then(res => console.log(res))
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="App">
      Hello
      <div>menuIcon AppIcon</div>
    </div>
  );
}

function Campaign(data) {
  return (
    <div>
      <div>
        <img src={`${data.campaign_icon_url}`} alt="Icon" />
      </div>
    </div>
  );
}

export default App;
