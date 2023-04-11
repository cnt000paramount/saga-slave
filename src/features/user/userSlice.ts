import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { fetchUser } from "./userAPI";
import { JSONPlaceholderUser } from "../../types/JSONPlaceholderUser";

export interface UserState {
  user: JSONPlaceholderUser | null;
  status: "idle" | "loading" | "failed";
}

const initialState: UserState = {
  user: null,
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
    setUser: (state, action) => {
      state.user = action.payload;
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

export const { setUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
