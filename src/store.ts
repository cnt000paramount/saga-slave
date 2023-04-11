import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from './features/counter/counterSlice';
import userReducer from './features/user/userSlice';
import spotifyReducer from './features/spotify/spotifySlice';
import createSagaMiddleware from "redux-saga";
import saga from "./sagas";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    spotify: spotifyReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(saga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
