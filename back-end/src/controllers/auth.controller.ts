import { MessageConstants } from "#/constants";
import {
  forgotPasswordInterface,
  loginUserInterface,
  registerUserInterface,
} from "#/interface/auth.interface";
import { User } from "#/models";
import jwt from "jsonwebtoken";
import { variables } from "#/utils";

const {
  USER_REGISTERED,
  EMAIL_EXISTS,
  INVALID_DETAILS,
  LOGIN_SUCCESS,
  PASSWORD_RESET_SUCCESS,
} = MessageConstants.AUTH;

class AuthController {
  async registerUser(req: registerUserInterface, res: any) {
    const { name, email, password } = req.body;
    const caseSensitiveEmail = email.toLowerCase();

    const oldUser = await User.findOne({
      email: caseSensitiveEmail,
    }).collation({ locale: "en", strength: 1 });

    if (oldUser) {
      return res.status(403).json({ message: EMAIL_EXISTS });
    }

    await User.create({ name, email: caseSensitiveEmail, password });

    res.status(201).json({
      message: USER_REGISTERED,
    });
  }

  async loginUser(req: loginUserInterface, res: any) {
    const { password, email } = req.body;

    const caseSensitiveEmail = email.toLowerCase();
    const user = await User.findOne({
      email,
    }).collation({ locale: "en", strength: 1 });

    if (!user) {
      return res.status(403).json({ message: INVALID_DETAILS });
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      throw new Error(INVALID_DETAILS);
    }

    const jwtToken = jwt.sign(
      { userId: user._id, email: caseSensitiveEmail, name: user.name },
      variables.JWT_SECRET
    );
    user.token = jwtToken;
    await user.save();

    return res.json({
      message: LOGIN_SUCCESS,
      userInfo: {
        id: user._id,
        name: user.name,
        email: caseSensitiveEmail,
      },
      token: jwtToken,
    });
  }

  async forgotPassword(req: forgotPasswordInterface, res: any) {
    const { email, newPassword, oldPassword } = req.body;
    const caseSensitiveEmail = email.toLowerCase();

    const user = await User.findOne({
      email: caseSensitiveEmail,
    }).collation({ locale: "en", strength: 1 });

    if (!user) {
      return res.status(403).json({ message: INVALID_DETAILS });
    }

    const isPasswordMatched = await user.comparePassword(oldPassword);

    if (!isPasswordMatched) {
      return res.status(403).json({ message: INVALID_DETAILS });
    }

    user.password = newPassword;

    await user.save();
    res.status(200).json({ message: PASSWORD_RESET_SUCCESS });
  }
}

export const authController = new AuthController();
