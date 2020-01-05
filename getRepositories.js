"use strict";

const fetch = require("node-fetch");

module.exports.handle = async ({
  queryStringParameters: { username = "isaacbatst" }
}) => {
  try {
    const userResponse = await fetch(
      `https://api.github.com/users/${username}`
    );

    if (userResponse.status !== 200) {
      throw new Error("User not found");
    }

    const reposResponse = await fetch(
      `https://api.github.com/users/${username}/repos`
    );

    const user = await userResponse.json();
    const repos = await reposResponse.json();

    return {
      statusCode: 200,
      body: JSON.stringify({
        user,
        repos
      })
    };
  } catch ({error}) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: error.message,
      })
    };
  }
};
