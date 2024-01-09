import Post from "./Post";
import { useEffect } from "react";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

export default function Content() {
  const [jokes, setJokes] = useState([]);
  const [img, setImg] = useState([]);

  useEffect(() => {
    fetchJokes();
    showImg();
  }, []);

  const supabaseUrl = "https://ewokwacjsoqeghdxcwrt.supabase.co";
  const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);

  async function showImg() {
    const { data, error } = await supabase.storage.getBucket('avatar')
    console.log(data)
    console.log(error);
    if (error) {
      console.log(error);
    } else {
      setImg(data);
    }
  }

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
      <img src={img} alt="avatar" />
      {jokes.map((joke) => (
        <Post key={joke._id} joke={joke} />
      ))}
    </>
  );
}
