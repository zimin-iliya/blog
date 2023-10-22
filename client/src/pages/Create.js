import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../comp/UserContext";

export default function Create() {
  const { userInfo } = useContext(UserContext);
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [redirect, setRedirect] = useState(false);

  console.log(image, title, "content", content);

  async function handleSubmit(e) {
    const data = new FormData();
    data.set("title", title);
    data.set("content", content);
    data.set("username", userInfo);
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
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          placeholder="Upload Image"
          onChange={(e) => setImage(e.target.files)}
        />
        <input
          type="title"
          placeholder="Joke Name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <ReactQuill
          value={content}
          onChange={(value) => setContent(value)}
          theme="snow"
          placeholder="Write a Joke"
          modules={{
            toolbar: [
              [{ header: [1, 2, false] }],
              ["bold", "italic", "underline", "strike", "blockquote"],
              [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
              ],
              ["link"],[ "image"].false,
              ["clean"],
              
            ],
          }}
        />
        <button className="create" type="submit">
          Submit
        </button>
      </form>
    </>
  );
}
