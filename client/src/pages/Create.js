import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../comp/UserContext";
import { useParams } from "react-router-dom";

export default function Create(_id) {
  const { id } = useParams();
  const { userInfo } = useContext(UserContext);
  // const [image, setImage] = useState("");
  const [joke, setJoke] = useState("");
  // const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [redirect, setRedirect] = useState(false);


  useEffect(() => {
    if (id) {
      console.log("this is id", id);
      fetch(`http://localhost:4000/jokes/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("useEffect works", data);
          setContent(data.content);
        })
        .catch((error) => {
          console.error("Error in useEffect:", error);
        });
    }
  }, [id]);

  async function generateJoke() {
    if (userInfo) {
      try {
        const response = await fetch("https://icanhazdadjoke.com/", {
          headers: {
            Accept: "text/plain",
          },
        });
        if (response.ok) {
          const data = await response.text();
          setJoke(data);

          console.log(data);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
  async function updatejoke() {
    try {
      const response = await fetch(`http://localhost:4000/jokes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content,
        }),
        credentials: "include",
      });
      if (response.ok) {
        console.log("update joke works");
        setRedirect(true);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSubmit(e) {
    if (id) {
      updatejoke();
    } else {
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
          credentials: "include",
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
            <button
              className="createjokebtn"
              type="button"
              onClick={generateJoke}
            >
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
