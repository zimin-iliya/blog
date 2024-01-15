import React from "react";
import Post from "../comp/Post";
import picture from "../IMG/logoface.png";
import { UserContext } from "../comp/UserContext";
import { useContext } from "react";
import { useState } from "react";

export default function Profile() {
  const [userJokes, setuserJokes] = useState([]);
  const { userInfo } = useContext(UserContext);
  async function ShowUserJokes() {
    console.log(userInfo);
    try {
      const response = await fetch(`http://localhost:4000/user/${userInfo}`, {
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
          <img className="logo-face" src={picture} alt="joke" />
          <p>
            Email: <br />
            <br />
            password: <br />
          </p>
            </div>
          <div className="profile-bottom">
            <button onClick={ShowUserJokes}>show all my jokes</button>
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
