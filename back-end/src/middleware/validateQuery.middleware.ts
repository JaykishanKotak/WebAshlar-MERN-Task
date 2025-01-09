import { Request, Response, NextFunction } from "express";

const validateQuery =
  (schema: any) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate(req.query, { abortEarly: false });

      next();
    } catch (err: any) {
      res.status(400).json({ errors: err.errors });
    }
  };

export default validateQuery;
