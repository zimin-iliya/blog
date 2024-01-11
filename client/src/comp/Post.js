import { formatISO9075 } from "date-fns";
import React, { useContext } from "react";
import { UserContext } from "../comp/UserContext";
import picture from "../IMG/logoface.png";

export default function Post(joke) {
  const { userInfo } = useContext(UserContext);

  function handleEdit() {
    window.location.href = `/edit/${joke.joke._id}`;
    
  }

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
      <div className="card">
        <div className="card-header">
          <div className="postimage">
            <img className="logo-face" src={picture} alt="joke" />
          </div>
          {/* <h2>{joke.joke.title}</h2> */}
          <div className="joke-text">
            <p>{joke.joke.content}</p>
          </div>
        </div>
        <div className="postauthor">
          <div className="author-right">
            <strong>by {joke.joke.username}</strong>
            <time>
              {formatISO9075(new Date(joke.joke.createdAt), {
                representation: "date",
              })}
            </time>
          </div>
          <div className="author-left">
            <button onClick={handleEdit} className="postbutton">
              Edit
            </button>
            <button onClick={handleDelete} className="postbutton">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
