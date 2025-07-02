import { SecuredUser } from "@/utils/apiUtils";

export const USER_UPDATE = "USER_UPDATE" as const;
export const UPDATE_USER_ID = "UPDATE_USER_ID" as const;
export const UPDATE_USER_NAME = "UPDATE_USER_NAME" as const;
export const UPDATE_USER_EMAIL = "UPDATE_USER_EMAIL" as const;
export const USER_RESET = "USER_RESET" as const;

export interface UpdateAllUserAction {
  type: typeof USER_UPDATE;
  payload: SecuredUser;
}
export interface IDAction {
  type: typeof UPDATE_USER_ID;
  payload: SecuredUser["id"];
}
export interface NameAction {
  type: typeof UPDATE_USER_NAME;
  payload: SecuredUser["name"];
}
export interface EmailAction {
  type: typeof UPDATE_USER_EMAIL;
  payload: SecuredUser["email"];
}
export interface ResetUserAction {
  type: typeof USER_RESET;
}

export function updateUser(payload: SecuredUser): UpdateAllUserAction {
  return {
    type: USER_UPDATE,
    payload,
  };
}
export function updateUserID(payload: string): IDAction {
  return {
    type: UPDATE_USER_ID,
    payload,
  };
}
export function updateUserName(payload: string): NameAction {
  return {
    type: UPDATE_USER_NAME,
    payload,
  };
}
export function updateUserEmail(payload: string): EmailAction {
  return {
    type: UPDATE_USER_EMAIL,
    payload,
  };
}
export function resetUser(): ResetUserAction {
  return {
    type: USER_RESET,
  };
}
export type UserAction =
  | IDAction
  | NameAction
  | EmailAction
  | UpdateAllUserAction
  | ResetUserAction;
