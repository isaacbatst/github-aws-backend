"use strict";

const {
  generateErrorResponse
} = require("../../classes/ErrorResponseGenerator");
const { validateRequest } = require("../../classes/RequestValidator");

const RequestError = require("../../classes/RequestError");

module.exports.handle = async ({ pathParameters }) => {
  try {
    if (!isRequestValid(pathParameters)) {
      throw new RequestError({ statusCode: 400, message: "Invalid params" });
    }

    return {
      statusCode: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "OPTIONS,DELETE"
      },
    };
  } catch (error) {
    return generateErrorResponse(error);
  }
};

const isRequestValid = pathParameters => {
  return validateRequest({
    requiredParams: ["owner", "repo"],
    receivedParams: pathParameters
  });
};
