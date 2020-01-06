const validateRequest = ({ requiredParams, receivedParams }) => {

  if(!receivedParams){
    return false;
  }

  const qtyOfInvalidRequiredParams = requiredParams.reduce(
    (qtyOfInvalidRequiredParams, requiredParam) => {
      if (receivedParams[requiredParam]) {
        return qtyOfInvalidRequiredParams;
      }

      return qtyOfInvalidRequiredParams + 1;
    },
    0
  );

  return qtyOfInvalidRequiredParams === 0;
};

module.exports = {
  validateRequest
}