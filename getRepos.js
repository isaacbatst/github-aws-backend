"use strict";

const fetch = require("node-fetch");

const { generateErrorResponse } = require("./classes/ErrorResponseGenerator");
const { validateRequest } = require("./classes/RequestValidator");

const RequestError = require("./classes/RequestError");

module.exports.handle = async ({ pathParameters }) => {
  try {
    if (!isRequestValid(pathParameters)) {
      throw new RequestError({ statusCode: 400, message: "Invalid params" });
    }

    const repos = await getRepos(pathParameters.username);

    return {
      statusCode: 200,
      body: JSON.stringify({ repos })
    };
  } catch (error) {
    return generateErrorResponse(error);
  }
};

const isRequestValid = pathParameters => {
  return validateRequest({
    requiredParams: ["username"],
    receivedParams: pathParameters
  });
};

const getRepos = async username => {
  const response = await fetch(
    `https://api.github.com/users/${username}/repos`
  );

  if (response.status !== 200) {
    throw new RequestError({
      statusCode: response.status,
      message: `Github says: ${response.statusText}` 
    });
  }

  return await response.json();
};
