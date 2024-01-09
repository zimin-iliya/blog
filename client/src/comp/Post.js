import { formatISO9075 } from "date-fns";
import React, { useContext } from "react";
import { UserContext } from "../comp/UserContext";
import picture from "../IMG/logoface.png";





export default function Post(joke) {



  
  const { userInfo } = useContext(UserContext);




  async function handleDelete() {
    try {
      const response = await fetch(
        `http://localhost:4000/jokes/${joke.joke._id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      if (response.ok) {
        window.location.reload();
      } else {
        console.log("error");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="postbody">
      <div className="postimage">
        <div className="card">
          <img className="logo-face" src={picture} alt="joke" />
          <h2>{joke.joke.title}</h2>
          <p>{joke.joke.content}</p>
        </div>
        <div className="postauthor">
          <p>by {joke.joke.username}</p>
          <button className="postbutton">Edit</button>
          <button onClick={handleDelete} className="postbutton">
            Delete
          </button>
          <time>
            {formatISO9075(new Date(joke.joke.createdAt), {
              representation: "date",
            })}
          </time>
        </div>
      </div>
      {/* <div className="postheader">
        <div />
        <h2>{joke.joke.title}</h2>
      </div>
      <div>
        <p>{joke.joke.content}</p>
      </div> */}
    </div>
  );
}
