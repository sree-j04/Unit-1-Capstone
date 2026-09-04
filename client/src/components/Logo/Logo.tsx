import { Link } from "react-router-dom";
import "./Logo.css";

function Logo() {
  return (
    <Link to="/" className="logo">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M3 12a9 9 0 0018 0" strokeLinecap="round" />
        <path d="M3 12h18" strokeLinecap="round" />
        <path
          d="M8 12c0-1 .5-2 1-3M12 12c0-1.5.5-3 1-4M16 12c0-1 .3-1.8.8-2.6"
          strokeLinecap="round"
        />
      </svg>
      <span>Spoonful</span>
    </Link>
  );
}

export default Logo;
