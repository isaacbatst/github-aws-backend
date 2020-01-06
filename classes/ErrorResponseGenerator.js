const generateErrorResponse = error => {
  switch (error.name) {
    case "RequestError":
      return {
        statusCode: error.statusCode,
        body: JSON.stringify({ message: error.message })
      };
    default:
      return {
        statusCode: 500,
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
