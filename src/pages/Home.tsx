/* eslint-disable react-hooks/exhaustive-deps */
import CardsListLayout from "components/layouts/CardsListLayout";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchFavoriteMovies } from "../redux/FavoritesReducer";
import { AppDispatch } from "../store";
import { getNowPlayingMovieList, getPopularMovieList } from "services/api";
import { Movie } from "types/MovieTypes";

const SCROLL_THRESHOLD = window.innerWidth < 900 ? 10 : 50;
const MAX_TOTAL_MOVIES = 30;

export default function Home() {
  const [nowPlayingMovieList, setNowPlayingMovieList] = useState<Movie[] | []>(
    [],
  );
  const [popularMovieList, setPopularMovieList] = useState<Movie[] | []>([]);
  const [isLoadingNowPlaying, setIsLoadingNowPlaying] = useState<boolean>(true);
  const [isLoadingPopular, setIsLoadingPopular] = useState<boolean>(true);
  const [popularPage, setPopularPage] = useState(1);
  const [totalMoviesLoaded, setTotalMoviesLoaded] = useState(0);
  const [isErrorNowPlaying, setIsErrorNowPlaying] = useState<boolean>(false);
  const [isErrorPopular, setIsErrorPopular] = useState<boolean>(false);
  const accountId = localStorage.getItem("account_id");
  const sessionId = localStorage.getItem("session_id");
  const dispatch = useDispatch<AppDispatch>();

  const fetchNowPlayingMovies = async (signal: AbortSignal) => {
    setIsLoadingNowPlaying(true);
    setIsErrorNowPlaying(false);
    try {
      const data = await getNowPlayingMovieList(signal);
      const limitData = data?.results.slice(0, 6) || [];
      setNowPlayingMovieList(limitData);
    } catch (error) {
      setIsErrorNowPlaying(true);
    } finally {
      setIsLoadingNowPlaying(false);
    }
  };

  const fetchPopularMovies = async (page: number, signal: AbortSignal) => {
    if (totalMoviesLoaded >= MAX_TOTAL_MOVIES) return;
    setIsLoadingPopular(true);
    setIsErrorPopular(false);
    try {
      const data = await getPopularMovieList(page, signal);
      const limitData = data?.results.slice(0, 6) || [];

      setPopularMovieList((prevList) => [...prevList, ...limitData]);

      setTotalMoviesLoaded((prevTotal) => prevTotal + limitData.length);
    } catch (error) {
      setIsErrorPopular(true);
    } finally {
      setIsLoadingPopular(false);
    }
  };

  const handleScroll = () => {
    const scrollThreshold = SCROLL_THRESHOLD;
    if (
      window.innerHeight + window.scrollY >=
        document.body.offsetHeight - scrollThreshold &&
      !isLoadingPopular
    ) {
      setPopularPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchNowPlayingMovies(controller.signal);
    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetchPopularMovies(popularPage, controller.signal);
    return () => {
      controller.abort();
    };
  }, [popularPage]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoadingPopular]);

  useEffect(() => {
    if (accountId && sessionId) {
      dispatch(fetchFavoriteMovies({ accountId, sessionId }));
    }
  }, [dispatch, accountId, sessionId]);

  return (
    <>
      <CardsListLayout
        title="Now Playing Movie"
        list={nowPlayingMovieList}
        isLoading={isLoadingNowPlaying}
        isError={isErrorNowPlaying}
        variant={"lg"}
      />
      <CardsListLayout
        title="Popular Movie"
        list={popularMovieList}
        isLoading={isLoadingPopular}
        isError={isErrorPopular}
        variant={"lg"}
      />
    </>
  );
}
