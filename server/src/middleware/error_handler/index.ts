import { ErrorRequestHandler } from "express";

export const error_handler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.log(err);
  res.status(err.status || 500).send(err);
};
