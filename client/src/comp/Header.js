import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "./UserContext";
import { Navigate } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);

  async function Logout() {
    try {
      await fetch("http://localhost:4000/logout", {
        credentials: "include",
      });
      setUserInfo(false);
      console.log(userInfo);
      setRedirect(true);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchProfile();
  }, );

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
      <header>
        <Link to="/" className="logo">
          Home
        </Link>
        <nav>
          {userInfo ? (
            <>
              <Link to="/create">Add a joke</Link>
              <Link to="/profile">{userInfo}</Link>
              <Link to="/login" onClick={Logout}>Logout</Link>
              {/* <a href="#" onClick={Logout}>
                Logout{" "}
              </a> */}
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
