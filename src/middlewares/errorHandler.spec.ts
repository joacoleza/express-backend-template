import {
  Response as ExResponse,
  Request as ExRequest,
  NextFunction
} from 'express';
import { errorHandler } from './errorHandler';
import { NotFoundError } from '../errors/NotFoundError';
import { ValidateError } from 'tsoa';

describe('ErrorHandler', () => {
  it('should respond 422 - Validation Failed when there is a ValidateError', () => {
    // Arrange
    const fieldsErrors = {
      prop1: {
        message: 'prop 1 error'
      }
    };
    const validateError: ValidateError = new ValidateError(
      fieldsErrors,
      'Error handler validate error'
    );
    const jsonFnMock = jest.fn();
    const res: ExResponse = {
      status: jest.fn().mockReturnValue({ json: jsonFnMock })
    } as unknown as ExResponse;
    const next: NextFunction = jest.fn();

    // Act
    errorHandler(validateError, {} as unknown as ExRequest, res, next);

    // Assert
    expect(res.status).toHaveBeenCalledWith(422);
    expect(jsonFnMock).toHaveBeenCalledWith({
      message: 'Validation Failed',
      details: fieldsErrors
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('should respond 404 - Not Found when there is a not NotFoundError', () => {
    // Arrange
    const notFoundError: NotFoundError = new NotFoundError(
      'Error handler not found error'
    );
    const jsonFnMock = jest.fn();
    const res: ExResponse = {
      status: jest.fn().mockReturnValue({ json: jsonFnMock })
    } as unknown as ExResponse;
    const next: NextFunction = jest.fn();

    // Act
    errorHandler(notFoundError, {} as unknown as ExRequest, res, next);

    // Assert
    expect(res.status).toHaveBeenCalledWith(404);
    expect(jsonFnMock).toHaveBeenCalledWith({
      message: 'Not found',
      details: 'Error handler not found error'
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('should respond 500 - Internal Server Error when there is an unhandled Error', () => {
    // Arrange
    const error: Error = new Error('Error handler error');
    const jsonFnMock = jest.fn();
    const res: ExResponse = {
      status: jest.fn().mockReturnValue({ json: jsonFnMock })
    } as unknown as ExResponse;
    const next: NextFunction = jest.fn();

    // Act
    errorHandler(error, {} as unknown as ExRequest, res, next);

    // Assert
    expect(res.status).toHaveBeenCalledWith(500);
    expect(jsonFnMock).toHaveBeenCalledWith({
      message: 'Internal Server Error'
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('should call next middleware when there is no error', () => {
    // Arrange
    const jsonFnMock = jest.fn();
    const res: ExResponse = {
      status: jest.fn()
    } as unknown as ExResponse;
    const next: NextFunction = jest.fn();

    // Act
    errorHandler('not-an-error', {} as unknown as ExRequest, res, next);

    // Assert
    expect(res.status).not.toHaveBeenCalled();
    expect(jsonFnMock).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });
});
