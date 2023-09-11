import React from "react";
import "./App.css";
import picture from "./IMG/header.png";
import Post from "./comp/Post";
function App() {
  return (
    <main>
      <header>
        <a href="/" className="logo">
          Home
        </a>
        <nav>
          <a href="/login">Login</a>
          <a href="/register">Register</a>
        </nav>
      </header>
      <img src={picture} alt="logo" />
      <div className="social">
        <button
          onClick={() => {
            window.location.href = "https://www.instagram.com/ludagrk/";
          }}
        >
          instagram
        </button>
        <button
          onClick={() => {
            window.location.href = "https://www.facebook.com/Ludagreko";
          }}
        >
          facebook
        </button>
        <button
          onClick={() => {
            window.location.href = "https://www.youtube.com/@zimin8";
          }}
        >
          youtube
        </button>
        <button
          onClick={() => {
            window.location.href = "https://www.linkedin.com/in/luda-greko/";
          }}
        >
          linkedin
        </button>
      </div>
      <Post />
      <Post />

    </main>
  );
}

export default App;
