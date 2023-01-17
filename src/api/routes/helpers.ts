import { Request, Response } from "express";
import { validationResult } from "express-validator";
import httpStatus from "http-status";

export const validationRequestSchema = (
  req: Request,
  res: Response,
  next: () => unknown,
) => {
  const wrapperErrors = validationResult(req);

  if (wrapperErrors.isEmpty()) {
    return next();
  }

  const errors = wrapperErrors.array().reduce<Record<string, string[]>>(
    (accumulator, currentValue) => {
      if (accumulator[currentValue.param] === undefined) {
        accumulator[currentValue.param] = [];
      }

      accumulator[currentValue.param].push(currentValue.msg);

      return accumulator;
    },
    {},
  );

  return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
    errors,
  });
};
