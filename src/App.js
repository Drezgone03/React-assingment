import React, { useState } from "react";
// import React from "react";
import "./App.css";
import Header from "./components/Header.jsx";
import UserInput from "./components/UserInput.jsx";
// import NewsList from "./components/NewsList.jsx";
// import { news } from "../db/db.js";

function App() {
  const [userEmail, setUserEmail] = useState(null);

  function handleLogin(email) {
    setUserEmail(email);
  }

  function handleLogout() {
    setUserEmail(null);
  }

  return (
    <div className="App">
      <Header userEmailPropt={userEmail} onLogoutPropt={handleLogout} />
      {userEmail ? (
        <div> Welcome, {userEmail}! </div>
      ) : (
        <UserInput onLogin={handleLogin} />
      )}
      <h2>Latest News</h2>
      {/* <NewsList newsData={news} /> */}
    </div>
  );
}

export default App;
