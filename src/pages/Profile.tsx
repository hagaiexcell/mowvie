import CardsListLayout from "components/layouts/CardsListLayout";
import profileIcon from "assets/icons/ic-profile.png";
import Button from "components/elements/Button";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store";
import { fetchFavoriteMovies, resetFavorites } from "../redux/FavoritesReducer";
import { deleteSessionId } from "services/api";
import { useNavigate } from "react-router-dom";
import { fetchProfileDetail } from "../redux/ProfileReducer";

export default function Profile() {
  const accountId = localStorage.getItem("account_id");
  const sessionId = localStorage.getItem("session_id");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { movies: favoriteMovieList, status } = useSelector(
    (state: RootState) => state.favorites,
  );
  const baseimgUrl = process.env.REACT_APP_BASEIMGURL;
  const isLoading = status === "loading" || status === "idle";
  const profileSelector = useSelector((state: RootState) => state.profile);

  const handleLogout = async () => {
    if (sessionId) {
      try {
        if (accountId) {
          await deleteSessionId(sessionId);
          localStorage.removeItem("account_id");
        }
        localStorage.removeItem("session_id");
        dispatch(resetFavorites());
        navigate(0);
        navigate("/");
      } catch (error) {
        console.error("Logout failed", error);
      }
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    if (accountId && sessionId) {
      dispatch(fetchFavoriteMovies({ accountId, sessionId }));
    }
  }, [dispatch, accountId, sessionId]);

  useEffect(() => {
    if (sessionId && accountId) {
      dispatch(fetchProfileDetail({ sessionId }));
    }
  }, [sessionId, dispatch, accountId]);

  return (
    <section className="container">
      <div className="grid grid-cols-1 md:grid-cols-12">
        <div className="col-span-4 border-b-[1px] border-gray-400 pb-6 md:border-b-0 md:border-r-[1px] md:pb-0">
          <div className="flex flex-col items-center space-y-10 px-8">
            <h2 className="">My Profile</h2>

            <div className="mt-12 space-y-4">
              {accountId && (
                <img
                  className="w-52 rounded-full border-4 border-primary bg-white md:w-80"
                  src={
                    profileSelector?.avatar?.tmdb?.avatar_path
                      ? `${baseimgUrl}/${profileSelector.avatar.tmdb.avatar_path}`
                      : profileIcon
                  }
                  alt=""
                />
              )}

              <h4 className="text-center">
                {accountId
                  ? profileSelector
                    ? `Username : ${profileSelector.username}`
                    : "Loading profile..."
                  : "You are logged in as a guest"}
              </h4>
            </div>
            <Button onClick={handleLogout} classname="w-full" variant="primary">
              Log out
            </Button>
          </div>
        </div>
        <div className="col-span-8 ">
          {accountId ? (
            <CardsListLayout
              title="Favorite Movies"
              list={favoriteMovieList}
              isLoading={isLoading}
              isError={status === "failed"}
              variant={"md"}
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full">
              <div className="py-5 md:py-0 md:px-5 text-lg">
                You need to log in to access your favorite list.
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
