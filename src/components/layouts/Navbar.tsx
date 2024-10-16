import logo from "../../assets/images/mowvie-logo.png";
import icProfile from "../../assets/icons/ic-profile.png";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-full border-b-[1px] border-b-gray-400 bg-body py-2">
      <div className="container flex items-center justify-between">
        <Link to={"/"}>
          <img className="w-20 cursor-pointer" src={logo} alt="" />
        </Link>
        <Link to={"/profile"}>
          <img
            className="w-10 cursor-pointer rounded-full border-2 border-primary bg-white"
            src={icProfile}
            alt=""
          />
        </Link>
      </div>
      <div></div>
    </nav>
  );
}
