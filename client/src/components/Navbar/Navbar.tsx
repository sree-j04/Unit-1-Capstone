import { NavLink } from "react-router-dom";
import Logo from "../Logo/Logo";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <Logo />
      <div className="navbar-links">
        <NavLink to="/recipes">Browse Recipes</NavLink>
        <NavLink to="/ai-assistant">AI Assistant</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
