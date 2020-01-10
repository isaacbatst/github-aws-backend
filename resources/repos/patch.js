"use strict";

const fetch = require("node-fetch");

const {
  generateErrorResponse
} = require("../../classes/ErrorResponseGenerator");
const { validateRequest } = require("../../classes/RequestValidator");

const RequestError = require("../../classes/RequestError");

module.exports.handle = async ({ pathParameters, body }) => {
  try {
    if (!isRequestValid(pathParameters)) {
      throw new RequestError({ statusCode: 400, message: "Invalid params" });
    }

    const repo = await getRepo(pathParameters);

    const parsedBody = JSON.parse(body);

    const bodyEntries = Object.entries(parsedBody);
    bodyEntries.forEach(([key, value]) => {
      repo[key] = value;
    })

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "OPTIONS,PATCH"
      },
      body: JSON.stringify({ repo })
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

const getRepo = async ({ repo, owner }) => {
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}`
  );

  if (response.status !== 200) {
    throw new RequestError({
      statusCode: response.status,
      message: `Github says: ${response.statusText}`
    });
  }

  return await response.json();
};
