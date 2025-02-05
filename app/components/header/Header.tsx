import Navbar from "./Navbar";
import AuthArea from "./AuthArea";
import ThemeToggler from "./ThemeToggler";

function Header() {
  return (
    <Navbar>
      <ThemeToggler />
      <AuthArea />
    </Navbar>
  );
}

export default Header;
