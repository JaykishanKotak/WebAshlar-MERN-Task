import { Request } from "express";

export interface registerUserInterface extends Request {
  body: {
    email: string;
    name: string;
    password: string;
  };
}

export interface loginUserInterface extends Request {
  body: {
    email: string;
    password: string;
  };
}

export interface forgotPasswordInterface extends Request {
  body: {
    email: string;
    oldPassword: string;
    newPassword: string;
  };
}
