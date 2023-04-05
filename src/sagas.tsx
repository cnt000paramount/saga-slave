import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import env from "./env";

export const fetchUserCall = (id) =>
  fetch(`https://jsonplaceholder.typicode.com/users/${id}`).then((res) =>
    res.json()
  );

export const fetchSearchCall = ({ searchLabel, token }) =>
  fetch(
    `https://api.spotify.com/v1/search?q=${searchLabel}&type=artist`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    }
  ).then((res) => res.json());

export const fetchAccessToken = () =>
  fetch(
    `${env.tokenEndpoint}?grant_type=client_credentials&client_id=${env.clientId}&client_secret=${env.clientSecret}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }
  ).then((res) => res.json());

function* fetchSearch(action: any) {
  try {
    const searchResult = yield call(fetchSearchCall, {
      searchLabel: action.payload.searchLabel,
      token: action.payload.token,
    });
    yield put({ type: "SPOTY_SEARCH_SUCCEEDED", searchResult: searchResult });
  } catch (e) {
    yield put({ type: "SPOTY_SEARCH_FAILED", message: e.message });
  }
}

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchUser(action: any) {
  try {
    const user = yield call(fetchUserCall, action.payload.id);
    yield put({ type: "USER_FETCH_SUCCEEDED", user: user });
  } catch (e) {
    yield put({ type: "USER_FETCH_FAILED", message: e.message });
  }
}

function* fetchToken(action: any) {
  try {
    const token = yield call(fetchAccessToken);
    yield put({ type: "GET_TOKEN_SUCCEEDED", token: token.access_token });
  } catch (e) {
    yield put({ type: "GET_TOKEN_FAILED", message: e.message });
  }
}

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* mySaga() {
  yield takeLatest("USER_FETCH_REQUESTED", fetchUser);
  yield takeLatest("GET_TOKEN_REQUEST", fetchToken);
  yield takeLatest("SPOTY_SEARCH_REQUEST", fetchSearch);
}

export default mySaga;
