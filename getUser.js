"use strict";

const fetch = require("node-fetch");

const errorResponseGenerator = require("./ErrorResponseGenerator");
const RequestError = require("./ResquestError");

module.exports.handle = async ({ queryStringParameters }) => {
  try {

    if (!paramsAreValid(queryStringParameters)) {
      throw new RequestError({ statusCode: 400, message: "Invalid params" });
    }

    const user = await getUser(username);

    return {
      statusCode: 200,
      body: JSON.stringify({ user })
    };
  } catch (error) {
    return errorResponseGenerator(error);
  }
};

const paramsAreValid = queryStringParameters => {
  return (
    !queryStringParameters.username ||
    queryStringParameters.username.trim().length < 1
  );
};

const getUser = async username => {
  const response = await fetch(`https://api.github.com/users/${username}`);

  if (response.status !== 200) {
    throw new RequestError({
      statusCode: response.status,
      message: response.statusText
    });
  }

  return await response.json();
};
