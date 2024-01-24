import React from "react";
import Post from "../comp/Post";
import { UserContext } from "../comp/UserContext";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";

export default function Profile() {
  const [userJokes, setuserJokes] = useState([]);
  const { userInfo } = useContext(UserContext);
  // const [img, setImg] = useState([]);




  async function ShowUserJokes() {
    console.log(userInfo);
    try {
      const response = await fetch(`http://localhost:4000/jokes/me`, {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setuserJokes(data);
        console.log(data);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="postbody">
      <div className="profile">
        <div className="postimage">
          <div className="profile-top">
            <strong>Username: {userInfo}</strong>
          </div>
          <div className="profile-middle">
          <img className="logo-face" src={''} alt="joke" />
          <p>
            Email: <br />
            <br />
            password: <br />
          </p>
            </div>
          <div className="profile-bottom">
            <button onClick={ShowUserJokes}>show all my jokes</button>
            <button>edit profile</button>
          </div>
        </div>
      </div>
      {userJokes.length ? (
        userJokes.map((joke) => <Post key={joke._id} joke={joke} />)
      ) : (
        <></>
      )}
    </div>
  );
}
