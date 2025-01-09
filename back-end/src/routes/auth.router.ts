import { RouteConstants } from "#/constants";
import { authController } from "#/controllers/auth.controller";
import { validationMiddleware } from "#/middleware";
import { authSchemas } from "#/validations";
import { Router } from "express";

const authRouter = Router();

authRouter.post(
  RouteConstants.AUTH.REGISTER,
  validationMiddleware(authSchemas.registerUser),
  authController.registerUser
);

authRouter.post(
  RouteConstants.AUTH.LOGIN,
  validationMiddleware(authSchemas.loginUser),
  authController.loginUser
);

authRouter.put(
  RouteConstants.AUTH.FORGOT_PASSWORD,
  validationMiddleware(authSchemas.forgotPassword),
  authController.forgotPassword
);

export default authRouter;
