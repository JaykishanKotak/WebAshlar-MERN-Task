import { NextFunction, Request, Response } from "express";
import qs from "qs";

const parseQueryStringMiddleware: any = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (typeof req.query === "string") {
    try {
      req.query = qs.parse(req.query);
    } catch (error) {
      console.error("Error parsing query string:", error);
      return res.status(400).json({ message: "Invalid query string format" });
    }
  }
  next();
};

export default parseQueryStringMiddleware;
