import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import env from "./env";

export const fetchUserCall = (id) =>
  fetch(`https://jsonplaceholder.typicode.com/users/${id}`).then((res) =>
    res.json()
  );

export const fetchAccessToken = () => {
  console.log("🚀 ~ file: sagas.tsx:15 ~ fetchAccessToken ~ env:", env);

  return fetch(
    `${env.tokenEndpoint}?grant_type=client_credentials
&client_id=${env.clientId}
&client_secret=${env.clientSecret}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }
  ).then((res) => res.json());
};

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
    yield put({ type: "GET_TOKEN_SUCCEEDED", token: token });
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
}

export default mySaga;
