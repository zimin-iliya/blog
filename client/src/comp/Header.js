import { Link } from "react-router-dom";
import {useContext, useEffect} from "react";
import { UserContext } from "./UserContext";

export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);

  async function Logout() {
    try {
      await fetch("http://localhost:4000/logout", {
        credentials: "include",
      });
      setUserInfo(null);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
      fetchProfile();
  }, []);

  async function fetchProfile() {
    try {
      const response = await fetch("http://localhost:4000/profile", {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setUserInfo(data.username);
        console.log(userInfo);

      } else {
        console.log("error");
      }
    } catch (error) {
      console.error(error);
    }
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
              <a href="#" onClick={Logout}>
                Logout{" "}
              </a>
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
