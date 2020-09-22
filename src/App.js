import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [videoTutorials, setvideoTutorials] = useState(null);

  useEffect(() => {
    // GET request using fetch inside useEffect React hook
    fetch(
      "https://lingumi-take-home-test-server.herokuapp.com/videoTutorials",
      { mode: "no-cors" }
    )
      .then((response) => console.log(response))
      // .then((data) => console.log(data, "data"));
      .then((data) => setvideoTutorials(data.total));
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {/* TO DO: replace this logo */}
        <h3>Video tutorial</h3>
      </header>
    </div>
  );
}

export default App;
