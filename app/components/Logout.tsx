import { signOut } from "@/actions/authActions";

function Logout() {
  return <button onClick={signOut}>Log Out</button>;
}

export default Logout;
