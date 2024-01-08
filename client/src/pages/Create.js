import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../comp/UserContext";

export default function Create() {
  const { userInfo } = useContext(UserContext);
  // const [image, setImage] = useState("");
  const [joke, setJoke] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [redirect, setRedirect] = useState(false);

  console.log( title, "content", content, userInfo);

  async function generateJoke() {
    if (userInfo) {
      const joketext = document.querySelector(".joketext");
      try {
        const response = await fetch("https://icanhazdadjoke.com/", {
          headers: {
            Accept: "text/plain",
          },
        });
        if (response.ok) {
          const data = await response.text();
          setJoke(data)

          console.log(data);
        } else {
          console.log("error");
        }
      }
      catch (error) {
        console.error(error);
      }
    }
  }
  

  async function handleSubmit(e) {
    const data = new FormData();
    const namebutton = document.querySelector(".submitbtn");
    
    // data.append("title", title);
    data.append("content", joke ? joke : content);
    data.append("username", userInfo);
    try {
      e.preventDefault();
      const response = await fetch("http://localhost:4000/create", {
        method: "POST",
        body: data,
      });
      if (response.ok) {
        namebutton.style.backgroundColor = "green";
        namebutton.innerHTML = "Joke added";
        await new Promise((resolve) => setTimeout(resolve, 1000));
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
    <div className="createbox">
      <h1>{userInfo}</h1>
      <form onSubmit={handleSubmit}>
        {/* <input
          type="title"
          placeholder="Joke title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        /> */}
         <textarea
         className="joketext"
          type="text"
          placeholder="Tell me a joke"
          value={content ? content : joke}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className="createbuttons">
        <button className="createjokebtn" type="button" onClick={generateJoke} >
          Genarate me a joke
        </button>
        <button className="submitbtn" type="submit">
          Submit
        </button>
        </div>
      </form>
      </div>
    </>
  );
}


