import Navbar from "./Navbar";
import AuthArea from "./AuthArea";
import ThemeToggler from "./ThemeToggler";
import LangToggler from "./LangToggler";

function Header() {
  return (
    <Navbar>
      <AuthArea />
      <ThemeToggler />
      <LangToggler />
    </Navbar>
  );
}

export default Header;
