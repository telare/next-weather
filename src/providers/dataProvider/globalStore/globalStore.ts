import UserReducer from "./reducers/user";
import LocationReducer from "./reducers/location";
import { combineReducers } from "redux";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { UserAction } from "./actions/user/types";
import { LocationAction } from "./actions/location/types";
import { ThunkDispatch } from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import sagaObserver from "./sagas";
const RootReducer = combineReducers({
  location: LocationReducer,
  user: UserReducer,
});
export type RootState = ReturnType<typeof RootReducer>;

// export const globalStore = createStore(RootReducer, applyMiddleware(thunk));
const sagaMiddleware = createSagaMiddleware();
export const globalStore = configureStore({
  reducer: RootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});
sagaMiddleware.run(sagaObserver);
export type RootAction = UserAction | LocationAction;
// define thunk dispatch type, because
// now middleware gives dispatch an
// ability to receive fnc not only plain action object
export type ThunkAppDispatch = ThunkDispatch<RootState, unknown, RootAction>;
export type AppDispatch = () => ThunkAppDispatch;

export const useAppDispatch: AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
// useSelector observes a store (store.subscribe) and receives it, then it passes the store into a callback provided by user
// export function useAppSelector(): TypedUseSelectorHook<RootState> {
//   return useSelector;
// }
