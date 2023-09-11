import picture from '../IMG/header.png';

export default function HeaderLogo() {
    return (
        <>
        <img src={picture} alt="logo" />
      <div className="social">
        <button
          onClick={() => {
            window.location.href = "https://www.instagram.com/ludagrk/";
          }}
        >
          instagram
        </button>
        <button
          onClick={() => {
            window.location.href = "https://www.facebook.com/Ludagreko";
          }}
        >
          facebook
        </button>
        <button
          onClick={() => {
            window.location.href = "https://www.youtube.com/@zimin8";
          }}
        >
          youtube
        </button>
        <button
          onClick={() => {
            window.location.href = "https://www.linkedin.com/in/luda-greko/";
          }}
        >
          linkedin
        </button>
      </div>
        </>
    )
}