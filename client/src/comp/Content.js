import { set } from "date-fns";
import Post from "./Post";
import { useEffect } from "react";
import { useState } from "react";
// import { createClient } from "@supabase/supabase-js";
import supabase from "../IMG/supabaseClient";


export default function Content() {
  const [jokes, setJokes] = useState([]);
  const [filtredjokes, setfiltredjokes] = useState([]);
  const [img, setImg] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    let sortedJokes = [...filtredjokes]
  if (selectedCategory === "newest") {
    sortedJokes = sortedJokes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } else if (selectedCategory === "oldest") {
    sortedJokes = sortedJokes.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  } else if (selectedCategory === "user") {
    sortedJokes = sortedJokes.sort((a, b) => a.username.localeCompare(b.username));
  } else if (selectedCategory === "all") {
    sortedJokes = jokes;
  }
  setfiltredjokes(sortedJokes);
  }, [selectedCategory, jokes]);

  useEffect(() => {
    fetchJokes();
    showImg();
  }, []);

  useEffect(() => {
    let sortedJokes = [...filtredjokes]
    setfiltredjokes(
      sortedJokes.filter(
        (joke) =>
          joke.content.toLowerCase().includes(search.toLowerCase()) && joke
      )
    );
    if (search.length < 1) {
      setfiltredjokes(jokes);
    }
  }, [search, jokes]);

  // const supabaseUrl = "https://ewokwacjsoqeghdxcwrt.supabase.co";
  // const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
  // const supabase = createClient(supabaseUrl, supabaseKey);

  async function showImg() {
    const publicUrl = supabase.storage.from('avatar/admin').getPublicUrl('ME2.jpg')
    setImg(publicUrl.data.publicUrl)
  }

  async function fetchJokes() {
    try {
      const response = await fetch("http://localhost:4000/jokes", {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setJokes(data);
        setfiltredjokes(data);
        setSelectedCategory("all");
      } else {
        console.log("error");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>

      <img  src={img} alt="joke" />


      <div className="search-container">
        <input
          type="text"
          placeholder="Search by text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          className="find"
        />
        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
          }}
        >
          <option value="all">All</option>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="user">User</option>
        </select>
      </div>{" "}
      {filtredjokes.length || search.length > 2 ? (
        <>
          {filtredjokes.map((joke) => (
            <Post key={joke._id} joke={joke} />
          ))}
        </>
      ) : (
        <>
          {/* {jokes.map((joke) => (
            <Post key={joke._id} joke={joke} />
          ))} */}
        </>
      )}
    </>
  );
}
