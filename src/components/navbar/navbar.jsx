import { Logo } from "./logo";

/* --------------- NavBar ----------------------- */
export function Navbar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}
