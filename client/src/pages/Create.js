import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../comp/UserContext";

export default function Create() {
  const { userInfo } = useContext(UserContext);
  // const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [redirect, setRedirect] = useState(false);

  console.log( title, "content", content, userInfo);
  

  async function handleSubmit(e) {
    const data = new FormData();
    
    // data.append("image", image);
    data.append("title", title);
    data.append("content", content);
    data.append("username", userInfo);
    try {
      console.log("data", data);
      e.preventDefault();
      const response = await fetch("http://localhost:4000/create", {
        method: "POST",
        body: data,
      });
      if (response.ok) {
        setRedirect(true);
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
      <h1>{userInfo}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="title"
          placeholder="Joke title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
         <input
          type="text"
          placeholder="Joke Name"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        
        <button className="create" type="submit">
          Submit
        </button>
      </form>
    </>
  );
}


