import { LocationAction, RESET_LOCATION, UPDATE_LOCATION } from "../actions/location/types";

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
    case UPDATE_LOCATION:
      return {
        ...state,
        lat: action.payload.lat,
        lon: action.payload.lon,
        cityName: action.payload.cityName,
      };

    case RESET_LOCATION:
      return initialLocation;

    default:
      return state;
  }
}
