import { Location } from "../../reducers/location";
export const UPDATE_LOCATION = "UPDATE_LOCATION" as const;
export const RESET_LOCATION = "RESET_LOCATION" as const;
export interface UpdateAllLocationAction {
  type: typeof UPDATE_LOCATION;
  payload: Location;
}
export function updateLocation(payload: Location): UpdateAllLocationAction {
  return {
    type: UPDATE_LOCATION,
    payload,
  };
}
export interface ResetLocationAction {
  type: typeof RESET_LOCATION;
}
export function resetLocation(): ResetLocationAction {
  return {
    type: RESET_LOCATION,
  };
}

export type LocationAction = UpdateAllLocationAction | ResetLocationAction;
