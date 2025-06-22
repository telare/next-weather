const inputNames: {
  registration: string[];
  logIn: string[];
} = {
  registration: ["name", "email", "password"],
  logIn: ["email", "password"],
};
const notifs: {
  success: string;
  failed: string;
} = {
  success: "Authentication passed, welcome!",
  failed: "Authentication failed",
};
const notifElementAttribute: string = "[data-sonner-toast]";

export { inputNames, notifs, notifElementAttribute };
