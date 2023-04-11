import { call, put, takeLatest } from "redux-saga/effects";
import env from "./env";

export interface ResponseGenerator {
  config?: any;
  data?: any;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
}

export const fetchUserCall = (id: string) =>
  fetch(`https://jsonplaceholder.typicode.com/users/${id}`).then((res) =>
    res.json()
  );

export const fetchSearchCall = ({
  searchLabel,
  token,
}: {
  searchLabel: string;
  token: string;
}) =>
  fetch(`https://api.spotify.com/v1/search?q=${searchLabel}&type=artist`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  }).then((res) => res.json());

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
    const searchResult: ResponseGenerator = yield call(fetchSearchCall, {
      searchLabel: action.payload.searchLabel,
      token: action.payload.token,
    });
    yield put({ type: "SEARCH_FETCH_SUCCEEDED", searchResult: searchResult });
  } catch (e) {
    yield put({
      type: "FETCH_FAILED",
      message: (e as { message: string }).message,
    });
  }
}

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchUser(action: any) {
  try {
    const user: ResponseGenerator = yield call(
      fetchUserCall,
      action.payload.id
    );
    yield put({ type: "USER_FETCH_SUCCEEDED", user: user });
  } catch (e) {
    yield put({
      type: "FETCH_FAILED",
      message: (e as { message: string }).message,
    });
  }
}

function* fetchToken(action: any) {
  try {
    const token: ResponseGenerator = yield call(fetchAccessToken);
    yield put({
      type: "TOKEN_FETCH_SUCCEEDED",
      token: (token as { access_token: string }).access_token,
    });
  } catch (e) {
    yield put({
      type: "FETCH_FAILED",
      message: (e as { message: string }).message,
    });
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
