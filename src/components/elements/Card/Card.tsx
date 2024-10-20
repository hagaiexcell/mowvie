import emptyImg from "assets/images/empty-img.jpg";
import icSave from "assets/icons/ic-save.svg";
import icSaveFill from "assets/icons/ic-save-fill.svg";
import icStar from "assets/icons/ic-star.png";
import { Movie } from "types/MovieTypes";
import roundNumbers from "utils/roundNumber";
import extractYear from "utils/extractYear";
import { addToFavorite } from "services/api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { toggleFavorite } from "../../../redux/FavoritesReducer";
import Swal from "sweetalert2";

interface CardProps {
  movie: Movie;
}

export default function Card({ movie }: CardProps) {
  const sessionId = localStorage.getItem("session_id") ?? null;
  const accountId = localStorage.getItem("account_id") ?? null;
  const dispatch = useDispatch();
  const { movies } = useSelector((state: RootState) => state.favorites);
  const isFavorite = movies.some((fav) => fav.id === movie.id);
  const baseimgUrl = process.env.REACT_APP_BASEIMGURL;

  const handleAddFavorite = async () => {
    if (!accountId) {
      Swal.fire({
        title: "Sorry",
        icon: "error",
        html: `Please log in with your account to add this movie to your favorites.`,
        showCloseButton: true,
        showCancelButton: false,
        focusConfirm: false,

        showConfirmButton: false,
      });
      return;
    }

    try {
      const newFavoriteStatus = !isFavorite;
      const result = await addToFavorite(
        accountId,
        movie.id,
        newFavoriteStatus,
        sessionId,
      );
      if (result.success) {
        dispatch(toggleFavorite(movie));
      }
    } catch (error) {
      alert("Failed to Add Favorite");
    }
  };

  return (
    <div className="group flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl p-2 text-center transition-all duration-300 hover:bg-[#303030]">
      <div className="relative h-full w-full">
        <img
          className="min-h-72 w-full rounded-xl object-cover transition-all duration-300 group-hover:brightness-50"
          src={
            movie.backdrop_path
              ? `${baseimgUrl}/${movie.backdrop_path}`
              : emptyImg
          }
          alt={movie.original_title || "Movie image"}
        />

        <div onClick={handleAddFavorite}>
          <img
            width={36}
            className={`absolute right-2 top-2 opacity-100 transition-all duration-300 ${isFavorite ? "opacity-0" : "opacity-100"} hover:opacity-0`}
            src={icSave}
            alt="Save Icon"
          />
          <img
            width={36}
            className={`absolute right-2 top-2 opacity-0 transition-all duration-300 ${isFavorite ? "opacity-100" : "opacity-0"} hover:opacity-100`}
            src={icSaveFill}
            alt="Save Icon Hover"
          />
        </div>
      </div>
      <div className="w-full space-y-1 text-start">
        <h4>{movie.original_title}</h4>
        <div className="flex justify-between transition-all duration-300 ease-out lg:-translate-y-6 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
          <div className="flex items-center gap-2">
            <img width={16} src={icStar} alt="Rating Icon" />
            <p className="desc">
              {roundNumbers(movie.vote_average)}
              <span className="text-slate-500">({movie.vote_count})</span>
            </p>
          </div>
          <p>{extractYear(movie.release_date)}</p>
        </div>
      </div>
    </div>
  );
}
