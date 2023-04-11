import { takeLatest } from "redux-saga/effects";
import { fetchUser } from "./features/user/sagas";
import { fetchSearch, fetchToken } from "./features/spotify/sagas";

function* saga() {
  // SI possono scomporre ancora e mettere nelle feature?
  yield takeLatest("USER_FETCH_REQUESTED", fetchUser);
  yield takeLatest("GET_TOKEN_REQUEST", fetchToken);
  yield takeLatest("SPOTY_SEARCH_REQUEST", fetchSearch);
}

export default saga;
