import { isNumber } from './isNumber';

describe('isNumber', () => {
  test.each([
    [true, -100],
    [true, 0],
    [true, 100],
    [true, 1.1],
    [true, '-100'],
    [true, '0'],
    [true, '100'],
    [true, '1.1'],
    [false, undefined],
    [false, null],
    [false, {}],
    [false, []],
    [false, 'string']
  ])('should return %s when parameter is %s', (expectedResult, parameter) => {
    expect(isNumber(parameter)).toEqual(expectedResult);
  });
});
