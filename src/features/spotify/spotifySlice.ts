import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { SearchContent } from "spotify-types";

export interface SpotifyState {
  token: string | null;
  error: string | null;
  spotify: SearchContent | null;
  status: "idle" | "loading" | "failed";
  type: "track" | "artist";
}

const initialState: SpotifyState = {
  token: null,
  spotify: null,
  error: null,
  status: "idle",
  type: "artist",
};

export const userSlice = createSlice({
  name: "spotify",
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload.error;
    },
    setToken: (state, action) => {
      state.token = action.payload.access_token;
    },
    setResult: (state, action) => {
      state.spotify = action.payload;
    },
    getToken() {},
    getResult(
      state,
      action: PayloadAction<{
        searchLabel: string;
        token: string;
        type: string;
      }>
    ) {},
  },
});

export const { setToken, setResult, setError, getToken, getResult } =
  userSlice.actions;

export const selectSpotify = (state: RootState) => state.spotify;

export default userSlice.reducer;
