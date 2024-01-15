import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "./UserContext";
import { Navigate } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);
  const [search, setSearch] = useState("");

  async function Logout() {
    try {
      await fetch("http://localhost:4000/logout", {
        credentials: "include",
      });
      setUserInfo(false);
      setRedirect(true);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchProfile();
  });

  async function fetchProfile() {
    try {
      const response = await fetch("http://localhost:4000/profile", {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setUserInfo(data.username);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.error(error);
    }
  }
  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <div className="header">
        <header>
          <div className="header-right">
            <Link to="/" className="header-link">
              Home
            </Link>
            <div className="search-container">
            <input type="text" value={search} onChange={(e)=> {setSearch(e.target.value)}}  className="find" />
            <button className="search">Search</button>
            </div>
          </div>

          <nav>
            {userInfo.length ? (
              <>
                <Link to="/create">Add a joke</Link>
                <Link to="/profile">{userInfo}</Link>
                <Link to="/login" onClick={Logout}>
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </>
            )}
          </nav>
        </header>
      </div>
    </>
  );
}
