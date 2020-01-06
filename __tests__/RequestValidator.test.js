const { validateRequest } = require("../classes/RequestValidator");

it("should return true", () => {
  expect(
    validateRequest({
      requiredParams: ["username"],
      receivedParams: { username: "isaac" }
    })
  ).toBe(true);
});

it("should return false", () => {
  expect(
    validateRequest({
      requiredParams: ["username"],
      receivedParams: { username: "" }
    })
  ).toBe(false);
});

it("should return false", () => {
  expect(
    validateRequest({
      requiredParams: ["username"],
      receivedParams: {}
    })
  ).toBe(false);
});
