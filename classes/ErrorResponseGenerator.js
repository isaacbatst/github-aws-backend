const generateErrorResponse = error => {
  switch (error.name) {
    case "RequestError":
      return {
        statusCode: error.statusCode,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Methods": "OPTIONS,GET"
        },
        body: JSON.stringify({ message: error.message }),
      };
    default:
      return {
        statusCode: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Methods": "OPTIONS,GET"
        },
        body: JSON.stringify({
          message: "Unexpected error",
          errorMessage: error.message
        })
      };
  }
};

module.exports = {
  generateErrorResponse
};
