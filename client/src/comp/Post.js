import { formatISO9075 } from "date-fns";
import React, { useContext } from "react";
import { UserContext } from "../comp/UserContext"
export default function Post(joke) {
  const { userInfo } = useContext(UserContext);
  
  async function handleDelete() {
    try {
      console.log(joke.joke._id);
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
    <div>
      <p>{joke.joke.username}</p>
      <p>{joke.joke._id}</p>
      <p>{joke.joke.title}</p>
      <p>{joke.joke.content}</p>
      {/* <div className="postimage">
        <div className="card"></div>
      </div>
      <div className="postheader">
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: joke.joke.content }}
        />
      </div>
      <div className="postbody">
        <div className="postauthor">
          <p>by {joke.joke.username}</p>
          <button className="postbutton">Read More</button>
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
       */}
    </div>
  );
}
