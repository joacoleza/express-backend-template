import {
  Response as ExResponse,
  Request as ExRequest,
  NextFunction
} from 'express';
import { FieldErrors, ValidateError } from 'tsoa';
import { NotFoundError } from '../errors/NotFoundError';

export interface ValidationApiError {
  message: 'Validation Failed';
  details: FieldErrors;
}

export interface NotFoundApiError {
  message: 'Not found';
  details: string;
}

export interface InternalServerError {
  message: 'Internal Server Error';
}

export const errorHandler = (
  err: unknown,
  req: ExRequest,
  res: ExResponse,
  next: NextFunction
): ExResponse | void => {
  if (err instanceof ValidateError) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
    const validationApiError: ValidationApiError = {
      message: 'Validation Failed',
      details: err?.fields
    };
    return res.status(422).json(validationApiError);
  }
  if (err instanceof NotFoundError) {
    console.info(`Caught NotFound Error for ${req.path}.`);
    const notFoundApiError: NotFoundApiError = {
      message: 'Not found',
      details: err?.message
    };
    return res.status(404).json(notFoundApiError);
  }
  if (err instanceof NotFoundError) {
    console.info(`Caught NotFound Error for ${req.path}.`);
    const notFoundApiError: NotFoundApiError = {
      message: 'Not found',
      details: err?.message
    };
    return res.status(404).json(notFoundApiError);
  }
  if (err instanceof Error) {
    console.error(`Unhandled error for ${req.path}.`, err);
    const internalServerError: InternalServerError = {
      message: 'Internal Server Error'
    };
    return res.status(500).json(internalServerError);
  }
  next();
};
