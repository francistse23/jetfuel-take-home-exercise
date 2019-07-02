import React, { useState, useEffect } from "react";

import "./App.css";

const plugCoUrl = "http://www.plugco.in/public/take_home_sample_feed";

function App() {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    fetch(plugCoUrl)
      .then(res => res.json())
      .then(res => setCampaigns(res))
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="App">
      Hello
      <div>menuIcon AppIcon</div>
    </div>
  );
}

export default App;
