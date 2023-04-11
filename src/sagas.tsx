import { call, put, takeLatest } from "redux-saga/effects";
import { setUser } from "./features/user/userSlice";
import { setToken, setResult, setError } from "./features/spotify/spotifySlice";
import { ResponseGenerator } from "./types/ResponseGenerator";
import { fetchAccessToken, fetchSearchCall, fetchUserCall } from "./Api";

function* fetchSearch(action: any) {
  try {
    const searchResult: ResponseGenerator = yield call(fetchSearchCall, {
      searchLabel: action.payload.searchLabel,
      token: action.payload.token,
      type: action.payload.type,
    });
    yield put(setResult(searchResult));
  } catch (e) {
    yield put(setError(e instanceof Error ? e.message : "Generic Error"));
  }
}

function* fetchUser(action: any) {
  try {
    const user: ResponseGenerator = yield call(
      fetchUserCall,
      action.payload.id
    );
    yield put(setUser(user));
  } catch (e) {
    yield put(setError(e instanceof Error ? e.message : "Generic Error"));
  }
}

function* fetchToken() {
  try {
    const token: ResponseGenerator = yield call(fetchAccessToken);
    yield put(setToken(token));
  } catch (e) {
    yield put(setError(e instanceof Error ? e.message : "Generic Error"));
  }
}

function* saga() {
  yield takeLatest("USER_FETCH_REQUESTED", fetchUser);
  yield takeLatest("GET_TOKEN_REQUEST", fetchToken);
  yield takeLatest("SPOTY_SEARCH_REQUEST", fetchSearch);
}

export default saga;
