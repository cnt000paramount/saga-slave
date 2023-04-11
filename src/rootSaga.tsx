import { all, fork } from "redux-saga/effects";
import { userSaga } from "./features/user/userSaga";
import { spotifySaga } from "./features/spotify/spotifySaga";

const rootSaga = function* () {
  yield all([fork(spotifySaga), fork(userSaga)]);
};

export default rootSaga;
