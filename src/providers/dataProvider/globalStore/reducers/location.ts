import {
  LOCATION_FETCH_FAILURE,
  LOCATION_FETCH_LOADING,
  LOCATION_RESET,
  LOCATION_UPDATE,
  LocationAction,
} from "../actions/location/types";

export interface Location {
  lon: string;
  lat: string;
  cityName: string;
}
const initialLocation: Location = {
  lat: "50.450001",
  lon: "30.523333",
  cityName: "Kyiv",
};
export default function LocationReducer(
  state: Location = initialLocation,
  action: LocationAction
): Location {
  switch (action.type) {
    case LOCATION_UPDATE:
      return {
        ...state,
        lat: action.payload.lat,
        lon: action.payload.lon,
        cityName: action.payload.cityName,
      };

    case LOCATION_RESET:
      return initialLocation;

    case LOCATION_FETCH_LOADING:
    case LOCATION_FETCH_FAILURE:
      return state;
    default:
      return state;
  }
}
