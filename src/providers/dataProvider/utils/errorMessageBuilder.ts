export function errorMessageBuilder(status: number): string {
  let message = "";
  switch (status) {
    case 401: {
      message =
        "401 - unathorized. Please log-in or sign-up with valid credentials";
      break;
    }
    case 404: {
      message = "404 - Not Found. Please check your location.";
      break;
    }
    case 500: {
      message = "500 - Internal Server Error. Please try again later.";
      break;
    }
    case 503: {
      message = "503 - Service Unavailable. Please try again later.";
      break;
    }
    default: {
      message = "An unexpected error occurred.";
      break;
    }
  }
  return message;
}
