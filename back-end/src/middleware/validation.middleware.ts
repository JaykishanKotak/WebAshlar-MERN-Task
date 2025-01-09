import { RequestHandler } from "express";
import * as yup from "yup";

const validationMiddleware = (schema: any): RequestHandler => {
  return async (req, res, next) => {
    if (!req.body)
      return res.status(422).json({ message: "Empty body is not excepeted !" });

    const schemaToValidate = yup.object({
      body: schema,
    });
    try {
      await schemaToValidate.validate(
        { body: req.body },
        { strict: true, abortEarly: true }
      );
      next();
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        res.status(422).json({ message: error.message });
      }
    }
  };
};

export default validationMiddleware;
