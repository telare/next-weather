import { ThunkAction } from "@reduxjs/toolkit";
import { RootState, ThunkAppDispatch } from "../../globalStore";
import { Location } from "../../reducers/location";

// Action type constants
export const LOCATION_UPDATE_REQUESTED = "LOCATION_UPDATE_REQUESTED" as const;
export const LOCATION_UPDATE = "LOCATION_UPDATE" as const;
export const LOCATION_RESET = "LOCATION_RESET" as const;
export const LOCATION_FETCH_LOADING = "LOCATION_FETCH_LOADING" as const;
export const LOCATION_FETCH_FAILURE = "LOCATION_FETCH_FAILURE" as const;

// Action interfaces
export interface LocationUpdateRequestAction {
  type: typeof LOCATION_UPDATE_REQUESTED;
  payload: string;
}
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
export const updateLocationRequest = (payload: string) => ({
  type: LOCATION_UPDATE_REQUESTED,
  payload,
});
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

export async function getCityLocation(
  city: string
): Promise<Location | undefined> {
  try {
    const response = await fetch(`/api/geocode?city=${city}`);
    if (!response.ok) {
      throw new Error(
        `Failed to get city location data. Status: ${response.status} ${response.statusText}`
      );
    }
    const location: Location = await response.json();
    return location;
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw e;
    }
    throw new Error("An unknown error occurred while fetching city location.");
  }
}
// Thunk action for fetching location by city name
// action creator - in this case returns action async function
export function fetchLocation(
  city: string
): ThunkAction<Promise<void>, RootState, unknown, LocationAction> {
  return async (dispatch: ThunkAppDispatch): Promise<void> => {
    dispatch(requestLocationLoading());
    try {
      const response = await getCityLocation(city);
      if (!response) {
        throw new Error("Failed to fetch geocode data");
      }
      const data: Location = response;
      dispatch(updateLocation(data));
    } catch (e: unknown) {
      let errorMsg: string =
        "An unknown error occurred while fetching city location";
      if (e instanceof Error) {
        errorMsg = e.message;
      }
      dispatch(requestLocationFailure(errorMsg));
    }
  };
}

export type LocationAction =
  | LocationUpdateRequestAction
  | LocationFetchLoadingAction
  | LocationFetchFailureAction
  | LocationUpdateAction
  | LocationResetAction;
