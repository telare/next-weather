import { call, put, takeEvery } from "redux-saga/effects";
import {
  getCityLocation,
  LocationUpdateRequestAction,
  requestLocationFailure,
  requestLocationLoading,
  updateLocation,
} from "./actions/location/types";
import { Location } from "./reducers/location";

// saga worker
function* fetchLocationWorker(action: LocationUpdateRequestAction) {
  yield put(requestLocationLoading());
  try {
    const location:Location = yield call(getCityLocation, action.payload);
    yield put(updateLocation(location));
  } catch (e: unknown) {    
    let errorMsg: string =
      "An unknown error occured while fetching city location";
    if (e instanceof Error) {
      errorMsg = e.message;
    }
    yield put(requestLocationFailure(errorMsg));
  }
}

export default function* sagaObserver() {
  yield takeEvery("LOCATION_UPDATE_REQUESTED", fetchLocationWorker);
}
