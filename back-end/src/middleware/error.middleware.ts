import { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err) {
    return res.status(500).json({ message: err.message });
  }
};

export default errorHandler;
