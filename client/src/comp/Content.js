import Post from "./Post";
import { useEffect } from "react";
import { useState } from "react";

export default function Content() {
  const [jokes, setJokes] = useState([]);

  useEffect(() => {
    fetchJokes();
  }, []);

  async function fetchJokes() {
    try {
      const response = await fetch("http://localhost:4000/jokes", {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setJokes(data);
        console.log(data);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      {jokes.map((joke) => (
        <Post key={joke._id} joke={joke} />
      ))}
    </>
  );
}
