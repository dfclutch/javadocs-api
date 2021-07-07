import { vaildateLoginInput } from "./login";

describe('vaildateLoginInput', () => {
  it('should validate valid input', () => {
    const input = {
      username: 'asdf1234',
      password: 'asdf1234'
    };

    const result = vaildateLoginInput(input);
    const expectedResult = {"errors": {}, "isValid": true};
    expect(result).toEqual(expectedResult);
  });

  it('should invalidate missing username', () => {
    const input = {
      username: '',
      password: 'asdf1234'
    };

    const result = vaildateLoginInput(input);
    const expectedResult = {
      "errors": {
        username: "Username field is required"
      },
      "isValid": false
    };
    expect(result).toEqual(expectedResult);
  });

  it('should invalidate missing password', () => {
    const input = {
      username: 'asdf1234',
      password: ''
    };

    const result = vaildateLoginInput(input);
    const expectedResult = {
      "errors": {
        password: "Password field is required"
      },
      "isValid": false
    };
    expect(result).toEqual(expectedResult);
  });
});