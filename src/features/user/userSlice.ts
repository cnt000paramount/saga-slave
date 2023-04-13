import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { fetchUser } from "./userAPI";
import { JSONPlaceholderUser } from "../../types/JSONPlaceholderUser";

export interface UserState {
  user: JSONPlaceholderUser | null;
  error: string | null;
  status: "idle" | "loading" | "failed";
}

const initialState: UserState = {
  user: null,
  error: null,
  status: "idle",
};

export const getUserAsync = createAsyncThunk(
  "user/fetchUser",
  async (id: number) => {
    const response = await fetchUser(id);
    return response;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // @ts-ignore
    getUser(state, action: PayloadAction<{ id: number }>) {},
    setUser(state, action) {
      state.user = action.payload;
    },
    setError(state, action) {
      state.error = action.payload.error;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload;
      })
      .addCase(getUserAsync.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { setUser, setError, getUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
