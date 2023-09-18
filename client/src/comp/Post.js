import picture2 from "../IMG/pope.jpg";
export default function Post() {
  return (
    <div className="post">
      <div className="postimage">
        <img src={picture2} alt="pope" />
      </div>
      <div className="postheader">
        <p className="postextra">
          How many Microsoft engineers does it take to change a light bulb?
          None. They just change the standard to darkness.
        </p>
      </div>
      <div className="postbody">
        <div className="postauthor">
          <p>by Luda Greko</p>
          <time>May 5, 2021</time>
        </div>
      </div>
    </div>
  );
}
