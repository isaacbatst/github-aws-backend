const generateErrorResponse = error => {
  switch (error.name) {
    case "RequestError":
      return {
        statusCode: error.statusCode,
        body: {
          message: error.message
        }
      };
    default:
      return {
        statusCode: 500,
        body: {
          message: "Unexpected error"
        }
      };
  }
};

module.exports = {
  generateErrorResponse
};
