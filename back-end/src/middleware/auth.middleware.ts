import { variables } from "#/utils";
import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { MessageConstants } from "#/constants";

const JWT_SECRET = variables.JWT_SECRET;

const isAuthUser = async (req: any, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res
      .status(401)
      .json({ message: MessageConstants.AUTH.AUTH_HEADER_REQUIRED });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: MessageConstants.AUTH.TOKEN_REQUIRED });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = decoded;

    next();
  } catch (err) {
    return res
      .status(403)
      .json({ message: MessageConstants.AUTH.INVALID_TOKEN });
  }
};

export default isAuthUser;
