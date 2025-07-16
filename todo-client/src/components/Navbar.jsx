import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand navbar-light bg-light mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/">TodoApp</Link>
        <div className="navbar-nav">
          <Link className="nav-link" to="/signup">Sign Up</Link>
          <Link className="nav-link" to="/login">Login</Link>
          <Link className="nav-link" to="/todos">Todos</Link>
        </div>
      </div>
    </nav>
  );
}