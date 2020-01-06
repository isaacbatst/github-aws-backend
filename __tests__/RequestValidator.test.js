const { validateRequest } = require('../classes/RequestValidator');

it('should return true', () => {
  expect(validateRequest({
    requiredParams: ['username'],
    receivedParams: { username: 'isaac' }
  })).toBe(true);
})
