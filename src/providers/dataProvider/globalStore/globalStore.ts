import UserReducer from "./reducers/user";
import LocationReducer from "./reducers/location";
import {
  combineReducers,
  legacy_createStore as createStore,
  Dispatch,
  Store,
} from "redux";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { UserAction } from "./actions/user/types";
import { LocationAction } from "./actions/location/types";

const RootReducer = combineReducers({
  location: LocationReducer,
  user: UserReducer,
});
export type RootState = ReturnType<typeof RootReducer>;

export const globalStore: Store<RootState, RootAction> =
  createStore(RootReducer);

type RootAction = UserAction | LocationAction;
export const useAppDispatch: () => Dispatch<RootAction> = useDispatch;
// useSelector observes a store (store.subscribe) and receives it, then it passes the store into a callback provided by user
// export function useAppSelector(): TypedUseSelectorHook<RootState> {
//   return useSelector;
// }
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
