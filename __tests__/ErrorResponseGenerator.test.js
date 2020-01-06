const { generateErrorResponse } = require("../classes/ErrorResponseGenerator");

it("should return an error response", () => {
  const statusCode = 400;
  const message = "Invalid params";

  const errorResponse = generateErrorResponse({
    message,
    statusCode,
    name: "RequestError"
  });

  expect(errorResponse.body).toEqual(JSON.stringify({ message }));
  expect(errorResponse.statusCode).toBe(statusCode);
});

it("should return a generic error response", () => {
  const errorMessage = 'Generic message';

  const errorResponse = generateErrorResponse({
    message: errorMessage,
    name: "Generic Error"
  });

  expect(errorResponse.body).toEqual(JSON.stringify({
    message: 'Unexpected error',
    errorMessage
  }));
});
