"use strict";

const fetch = require("node-fetch");

module.exports.handle = async ({
  queryStringParameters: { username = "isaacbatst" }
}) => {
  try {
    const user = await getUser(username);
    const repos = await getRepos(username);

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

const getUser = async username => {
  const userResponse = await fetch(
    `https://api.github.com/users/${username}`
  );

  if (userResponse.status !== 200) {
    throw new Error("User not found");
  }

  return await userResponse.json();
}

const getRepos = async username => {
  const reposResponse = await fetch(
    `https://api.github.com/users/${username}/repos`
  );

  return await reposResponse.json();
}