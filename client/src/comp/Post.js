import picture2 from '../IMG/pope.jpg'
export default function Post() {
    return (
        <div className="post">
        <div className="postimage">
          <img src={picture2} alt="pope" />
        </div>
        <div className="postheader">
          <h1>Story of my life</h1>
        </div>
        <div className="postbody">
        <div className="postauthor">
          <p>by Luda Greko</p>
          <time>May 5, 2021</time>
        </div>
          <p>
            I am a full stack web developer. I have a passion for learning and
            creating new things. I am a graduate of the University of Texas at
            Austin Coding Bootcamp. I am a hard worker and a team player. I am
            looking forward to working with you.
          </p>
        </div>
      </div>
    )
}