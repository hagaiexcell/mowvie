import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getFavoriteMovies } from "services/api";
import { Movie } from "types/MovieTypes";

interface FavoritesState {
  movies: Movie[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export const fetchFavoriteMovies = createAsyncThunk<
  Movie[],
  { accountId: string | null; sessionId: string | null }
>("favorites/fetchFavoriteMovies", async ({ accountId, sessionId }) => {
  const response = await getFavoriteMovies(accountId, sessionId);
  return response;
});

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    movies: [],
    status: "idle",
    error: null,
  } as FavoritesState,
  reducers: {
    toggleFavorite: (state, action) => {
      const movie = action.payload;
      const existingMovie = state.movies.find((m) => m.id === movie.id);

      if (existingMovie) {
        state.movies = state.movies.filter((m) => m.id !== movie.id);
      } else {
        state.movies.push(movie);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavoriteMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFavoriteMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.movies = action.payload;
      })
      .addCase(fetchFavoriteMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
