import axios from "axios";
import { MovieResponse } from "types/MovieTypes";

const apiKey = process.env.REACT_APP_TOKEN;
const baseUrl = process.env.REACT_APP_BASEURL;

export const getRequestToken = async () => {
  try {
    const response = await axios.get(`${baseUrl}/authentication/token/new`, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    });
    return response.data.request_token;
  } catch (error) {
    throw error;
  }
};

export const createSessionLogin = async (
  username: string,
  password: string,
  requestToken: string,
) => {
  try {
    const response = await axios.post(
      `${baseUrl}/authentication/token/validate_with_login`,
      {
        username,
        password,
        request_token: requestToken,
      },
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      },
    );

    return response.data.request_token;
  } catch (error) {}
};

export const getSessionId = async (requestToken: string) => {
  try {
    const response = await axios.post(
      `${baseUrl}/authentication/session/new`,
      {
        request_token: requestToken,
      },
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      },
    );
    return response.data.session_id;
  } catch (error) {
    throw error;
  }
};

export const deleteSessionId = async (sessionId: string | null) => {
  try {
    const response = await axios.delete(
      `${baseUrl}/authentication/session?session_id=${sessionId}`,
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createGuestSession = async () => {
  try {
    const response = await axios.get(
      `${baseUrl}/authentication/guest_session/new`,
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      },
    );

    return response.data.guest_session_id;
  } catch (error) {}
};

export const getNowPlayingMovieList = async (
  signal: AbortSignal,
): Promise<MovieResponse | null> => {
  try {
    const response = await axios.get<MovieResponse>(
      `${baseUrl}/movie/now_playing`,
      {
        params: {
          language: "en-US",
          page: 1,
        },
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        signal: signal,
      },
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === "ERR_CANCELED") {
        return null;
      } else {
        console.error("Error fetching now playing movies:", error);
        throw error;
      }
    }
    console.error("Unknown error fetching now playing movies:", error);
    throw error;
  }
};

export const getPopularMovieList = async (
  page: number,
  signal: AbortSignal,
): Promise<MovieResponse | null> => {
  try {
    const response = await axios.get<MovieResponse>(
      `${baseUrl}/movie/popular`,
      {
        params: {
          language: "en-US",
          page: page,
        },
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        signal: signal,
      },
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === "ERR_CANCELED") {
        return null;
      } else {
        console.error("Error fetching Popular movies:", error);
        throw error;
      }
    }
    console.error("Unknown error fetching Popular movies:", error);
    throw error;
  }
};

export const getAccountDetail = async (sessionId: string | null) => {
  try {
    const response = await axios.get(`${baseUrl}/account`, {
      params: {
        api_key: apiKey,
        session_id: sessionId,
      },
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addToFavorite = async (
  accountId: string | null,
  movieId: number,
  favorite: boolean,
  sessionId: string | null,
) => {
  try {
    const response = await axios.post(
      `${baseUrl}/account/${accountId}/favorite`,
      {
        media_type: "movie",
        media_id: movieId,
        favorite: favorite,
      },
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        params: {
          session_id: sessionId,
        },
      },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getFavoriteMovies = async (
  accountId: string | null,
  sessionId: string | null,
  signal?: AbortSignal,
) => {
  try {
    const response = await axios.get(
      `${baseUrl}/account/${accountId}/favorite/movies`,
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        params: {
          session_id: sessionId,
        },
        signal: signal,
      },
    );
    return response.data.results;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === "ERR_CANCELED") {
        return null;
      } else {
        console.error("Error fetching Popular movies:", error);
        throw error;
      }
    }
    console.error("Unknown error fetching Popular movies:", error);
    throw error;
  }
};
