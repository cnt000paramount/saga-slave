import { call, put } from "redux-saga/effects";
import { setUser, setError } from "./userSlice";
import { ResponseGenerator } from "../../types/ResponseGenerator";
import { fetchUserCall } from "../../Api";

export function* fetchUser(action: any) {
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