import { formatISO9075 } from "date-fns";
import { useState } from "react";
export default function Post(joke) {
  const [gradient, setGradient] = useState(getRandomGradient());

  function getRandomGradient() {
    const colors = [];
    for (let i = 0; i < 2; i++) {
      colors.push(getRandomColor());
    }
    return `linear-gradient(45deg, ${colors[0]}, ${colors[1]})`;
  }

  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const changeGradient = () => {
    setGradient(getRandomGradient());
  };
  return (
    <div className="post">
      <div className="postimage">
        <div
          className="random-color-background"
          style={{ background: gradient, opacity: 0.8 }}
          onClick={changeGradient}
        >
        </div>
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
          <time>
            {formatISO9075(new Date(joke.joke.createdAt), {
              representation: "date",
            })}
          </time>
        </div>
      </div>
    </div>
  );
}
