import logo from "../../assets/images/mowvie-logo.png";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import profileIcon from "assets/icons/ic-profile.png";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store";
import { fetchProfileDetail } from "../../redux/ProfileReducer";

export default function Navbar() {
  const sessionId = localStorage.getItem("session_id");
  const accountId = localStorage.getItem("account_id");
  const baseimgUrl = process.env.REACT_APP_BASEIMGURL;
  const profileSelector = useSelector((state: RootState) => state.profile);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (accountId) {
      if (sessionId) {
        dispatch(fetchProfileDetail({ sessionId }));
      }
    }
  }, [sessionId, dispatch, accountId]);

  return (
    <nav className="w-full border-b-[1px] border-b-gray-400 bg-body py-2">
      <div className="container flex items-center justify-between">
        <Link to={"/"}>
          <img className="w-20 cursor-pointer" src={logo} alt="" />
        </Link>
        <Link to={"/profile"}>
          <img
            className="w-10 cursor-pointer rounded-full border-2 border-primary bg-white"
            src={
              profileSelector?.avatar?.tmdb?.avatar_path
                ? `${baseimgUrl}/${profileSelector.avatar.tmdb.avatar_path}`
                : profileIcon
            }
            alt=""
          />
        </Link>
      </div>
      <div></div>
    </nav>
  );
}
