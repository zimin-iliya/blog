import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

export default function Header() {
  const [username, setUsername] = useState("");

  async function Logout() {
    try {
      await fetch("http://localhost:4000/logout", {
        credentials: "include",
      });
      setUsername("");
    } catch (error) {
      console.error(error);
    }
  }


  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    }).then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          console.log(data);
          setUsername(data.username);
        });
      } else {
        console.log("error");
      }
    });
  }, []);
  return (
    <>
      <header>
        <Link to="/" className="logo">
          Home
        </Link>
        <nav>
          {username ? (
            <>
            <Link to="/create">Add a joke</Link>
            <Link to="/profile">{username}</Link>
            <a href="#" onClick={Logout}>Logout </a>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </header>
    </>
  );
}
