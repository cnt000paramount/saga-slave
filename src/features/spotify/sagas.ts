import { call, put } from "redux-saga/effects";
import { setToken, setResult, setError } from "./spotifySlice";
import { ResponseGenerator } from "../../types/ResponseGenerator";
import { fetchAccessToken, fetchSearchCall } from "../../Api";

export function* fetchSearch(action: any) {
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

export function* fetchToken() {
  try {
    const token: ResponseGenerator = yield call(fetchAccessToken);
    yield put(setToken(token));
  } catch (e) {
    yield put(setError(e instanceof Error ? e.message : "Generic Error"));
  }
}
