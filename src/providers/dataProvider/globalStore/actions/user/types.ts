import { SecuredUser } from "@/utils/apiUtils";

export const UPDATE_USER = "UPDATE_USER" as const;
export const UPDATE_USER_ID = "UPDATE_USER_ID" as const;
export const UPDATE_USER_NAME = "UPDATE_USER_NAME" as const;
export const UPDATE_USER_EMAIL = "UPDATE_USER_EMAIL" as const;
export const RESET_USER = "RESET_USER" as const;

export interface UpdateAllUserAction {
  type: typeof UPDATE_USER;
  payload: SecuredUser;
}
export function updateUser(payload: SecuredUser): UpdateAllUserAction {
  return {
    type: UPDATE_USER,
    payload,
  };
}
export interface IDAction {
  type: typeof UPDATE_USER_ID;
  payload: SecuredUser["id"];
}
export function updateUserID(payload: string): IDAction {
  return {
    type: UPDATE_USER_ID,
    payload,
  };
}
export interface NameAction {
  type: typeof UPDATE_USER_NAME;
  payload: SecuredUser["name"];
}
export function updateUserName(payload: string): NameAction {
  return {
    type: UPDATE_USER_NAME,
    payload,
  };
}
export interface EmailAction {
  type: typeof UPDATE_USER_EMAIL;
  payload: SecuredUser["email"];
}
export function updateUserEmail(payload: string): EmailAction {
  return {
    type: UPDATE_USER_EMAIL,
    payload,
  };
}
export interface ResetUserAction {
  type: typeof RESET_USER;
}
export function resetUser(): ResetUserAction {
  return {
    type: RESET_USER,
  };
}

export type UserAction =
  | IDAction
  | NameAction
  | EmailAction
  | UpdateAllUserAction
  | ResetUserAction;

