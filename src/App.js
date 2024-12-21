// import React, { useState, useEffect } from "react";

// import "./App.css";
// import Header from "./components/Header.jsx";
// import UserInput from "./components/UserInput.jsx";
// import NewsList from "./components/NewsList.jsx";
// import SearchBar from "./components/SearchBar.jsx";

// function App() {
//   const [userEmail, setUserEmail] = useState(null);
//   const [news, setNews] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchNews() {
//       try {
//         const response = await fetch("http://localhost:3001/news");
//         if (!response.ok) throw new Error("Failed to fetch news");
//         const data = await response.json();
//         setNews(data);
//       } catch (error) {
//         console.error("Error fetching news", error);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchNews();
//   }, []);

//   function handleLogin(email) {
//     setUserEmail(email);
//   }

//   function handleLogout() {
//     setUserEmail(null);
//   }

//   return (
//     <div className="App">
//       <Header userEmailPropt={userEmail} onLogoutPropt={handleLogout} />
//       {userEmail ? (
//         <div> Welcome, {userEmail}! </div>
//       ) : (
//         <UserInput onLogin={handleLogin} />
//       )}
//       <h2>Latest News</h2>
//       <NewsList newsData={news} />
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import UserInput from "./components/UserInput";
import SearchBar from "./components/SearchBar";
import NewsList from "./components/NewsList";

function App() {
  const [userEmail, setUserEmail] = useState(null);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cache, setCache] = useState({}); // Cache for search results

  // Fetch News with optional query
  async function fetchNews(searchQuery = "") {
    if (cache[searchQuery]) {
      setNews(cache[searchQuery]); // Load from cache
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3001/news?search=${searchQuery}`
      );
      if (!response.ok) throw new Error("Failed to fetch news");
      const data = await response.json();

      // Cache results and update state
      setCache((prevCache) => ({ ...prevCache, [searchQuery]: data }));
      setNews(data);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchNews(); // Fetch all news initially
  }, []);

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
        <div>Welcome, {userEmail}!</div>
      ) : (
        <UserInput onLogin={handleLogin} />
      )}
      <h2>Latest News</h2>

      <SearchBar onSearch={fetchNews} />

      {loading ? (
        <div className="loading-spinner"></div>
      ) : (
        <NewsList newsData={news} />
      )}
    </div>
  );
}

export default App;
