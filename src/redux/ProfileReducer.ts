import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAccountDetail } from "services/api";
import { ProfileTypes } from "types/MovieTypes";

export const fetchProfileDetail = createAsyncThunk<
  ProfileTypes,
  { sessionId: string }
>("profile/fetchProfileDetail", async ({ sessionId }) => {
  if (!sessionId) throw new Error("Session ID is required");
  const response = await getAccountDetail(sessionId);
  return response;
});

const initialState = {
  avatar: {
    gravatar: {
      hash: "",
    },
    tmdb: {
      avatar_path: "",
    },
  },
  id: null,
  iso_639_1: "",
  iso_3166_1: "",
  name: "",
  include_adult: false,
  username: "",
  status: "idle",
  error: "",
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileDetail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProfileDetail.fulfilled, (state, action) => {
        state.status = "succeeded";
        Object.assign(state, action.payload);
      })
      .addCase(fetchProfileDetail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default profileSlice.reducer;
