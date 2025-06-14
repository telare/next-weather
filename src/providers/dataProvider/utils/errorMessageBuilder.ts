export function clientErrorMessageBuilder(
  statusCode: number | undefined
): string {
  let message = "";
  switch (statusCode) {
    case 401: {
      message =
        statusCode +
        " - unathorized. Please press";
      break;
    }
    case 404: {
      message = statusCode + " - Not Found. Please refresh the page.";
      break;
    }
    case 500: {
      message =
        statusCode + " - Internal Server Error. Please try again later.";
      break;
    }
    case 503: {
      message = statusCode + " - Service Unavailable. Please try again later.";
      break;
    }
    default: {
      message = "An unexpected error occurred.";
      break;
    }
  }
  return message;
}
