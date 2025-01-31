import { Response } from "express";

export const handleResponse = (res: Response, result: any) => {
  res
    .status(result.statusCode)
    .json(
      result.statusCode === 200 || result.statusCode === 201
        ? result.data
        : { message: result.message }
    );
};

export const errorResponse = (statusCode: number, message: string) => {
  return { statusCode: statusCode, message: message };
};
