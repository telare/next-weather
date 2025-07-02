import { SecuredUser } from "@/utils/apiUtils";
import {
  USER_UPDATE,
  UPDATE_USER_EMAIL,
  UPDATE_USER_ID,
  UPDATE_USER_NAME,
  UserAction,
} from "../actions/user/types";

const initialUser: SecuredUser = {
  email: "",
  id: "",
  name: "",
};
export default function UserReducer(
  state: SecuredUser = initialUser,
  action: UserAction
): SecuredUser {
  switch (action.type) {
    case USER_UPDATE:
      return {
        ...state,
        name: action.payload.name,
        email: action.payload.email,
        id: action.payload.id,
      };
    case UPDATE_USER_ID:
      return {
        ...state,
        id: action.payload,
      };
    case UPDATE_USER_NAME:
      return {
        ...state,
        name: action.payload,
      };
    case UPDATE_USER_EMAIL:
      return {
        ...state,
        email: action.payload,
      };
    case "USER_RESET":
      return initialUser;
    default:
      return state;
  }
}
