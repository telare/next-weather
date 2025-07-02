import { ThunkAction } from "@reduxjs/toolkit";
import { RootState, ThunkAppDispatch } from "../../globalStore";
import { Location } from "../../reducers/location";

// Action type constants
export const LOCATION_UPDATE = "LOCATION_UPDATE" as const;
export const LOCATION_RESET = "LOCATION_RESET" as const;
export const LOCATION_FETCH_LOADING = "LOCATION_FETCH_LOADING" as const;
export const LOCATION_FETCH_FAILURE = "LOCATION_FETCH_FAILURE" as const;

// Action interfaces
export interface LocationUpdateAction {
  type: typeof LOCATION_UPDATE;
  payload: Location;
}

export interface LocationResetAction {
  type: typeof LOCATION_RESET;
}

export interface LocationFetchLoadingAction {
  type: typeof LOCATION_FETCH_LOADING;
}

export interface LocationFetchFailureAction {
  type: typeof LOCATION_FETCH_FAILURE;
  payload: string;
}

// Action creators
export const updateLocation = (payload: Location): LocationUpdateAction => ({
  type: LOCATION_UPDATE,
  payload,
});

export const resetLocation = (): LocationResetAction => ({
  type: LOCATION_RESET,
});

export const requestLocationLoading = (): LocationFetchLoadingAction => ({
  type: LOCATION_FETCH_LOADING,
});

export const requestLocationFailure = (
  error: string
): LocationFetchFailureAction => ({
  type: LOCATION_FETCH_FAILURE,
  payload: error,
});

// Thunk action for fetching location by city name
// action creator - in this case returns action async function
export function fetchLocation(
  city: string
): ThunkAction<Promise<void>, RootState, unknown, LocationAction> {
  return async (dispatch: ThunkAppDispatch): Promise<void> => {
    dispatch(requestLocationLoading());
    try {
      const response = await fetch(`/api/geocode?city=${city}`);
      if (!response.ok) {
        throw new Error("Failed to fetch geocode data");
      }
      const data: Location = await response.json();
      dispatch(updateLocation(data));
    } catch (error: unknown) {
      dispatch(requestLocationFailure((error as Error).message));
    }
  };
}

export type LocationAction =
  | LocationFetchLoadingAction
  | LocationFetchFailureAction
  | LocationUpdateAction
  | LocationResetAction;
