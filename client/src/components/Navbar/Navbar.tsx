import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      {" | "}
      <NavLink to="/recipes">Browse Recipes</NavLink>
      {" | "}
      <NavLink to="/ai-assistant">AI Assistant</NavLink>
      {" | "}
      <NavLink to="/login">Login</NavLink>
      {" | "}
      <NavLink to="/signup">Sign Up</NavLink>
      {" | "}
      <NavLink to="/dashboard">Dashboard</NavLink>
    </nav>
  );
}

export default Navbar;
