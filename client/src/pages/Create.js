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

  console.log(image, title, content);

  async function handleSubmit(e) {
    e.preventDefault();

    const data = new FormData();
    data.set("image", image[0]);
    data.set("title", title);
    data.set("content", content);
    data.set("username", userInfo); // this is the user that is logged in")
    console.log(data);
    try {
      const response = await fetch("http://localhost:4000/create", {
        method: "POST",
        body: data,
      });
      if (response.ok) {
        
          console.log(data);
          console.log(response);
      
        
      } else {
        console.log("error");
      }
    } catch (error) {
      console.error(error);
    }
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
              ["italic", "underline", "strike"].false,
              ["bold", , "blockquote"],
              [{ list: "" }, { list: "" }, { indent: "" }, { indent: "" }]
                .false,
              ["link", "image"].false,
              ["clean"].false,
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
