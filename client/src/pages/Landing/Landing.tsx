import { Link } from "react-router-dom";
import "./Landing.css";

function Landing() {
  return (
    <div className="landing-hero">
      <h1>Welcome to Spoonful</h1>
      <p>Find and share recipes.</p>
      <div className="landing-cta">
        <Link to="/recipes" className="btn">
          Explore Recipes
        </Link>
        <Link to="/login" className="btn btn-outline">
          Login
        </Link>
      </div>
    </div>
  );
}

export default Landing;
