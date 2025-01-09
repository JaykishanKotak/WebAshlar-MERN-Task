import * as yup from "yup";

const authSchemas = {
  registerUser: yup.object().shape({
    name: yup
      .string()
      .trim()
      .required("Name is missing !")
      .min(3, "Name is too short !")
      .max(20, "Name is too long !"),
    email: yup
      .string()
      .email("Invalid email Id !")
      .required("Email is missing !"),
    password: yup
      .string()
      .trim()
      .required("Password is missing !")
      .min(8, "Password is too short")
      .max(24, "Password is too long !")
      .matches(
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#\$%\^&\*])[a-zA-Z\d!@#\$%\^&\*]+$/,
        "Password is too simple !"
      ),
  }),

  loginUser: yup.object().shape({
    email: yup
      .string()
      .email("Invalid email Id !")
      .required("Email is missing !"),
    password: yup.string().trim().required("Password is missing !"),
  }),

  forgotPassword: yup.object().shape({
    email: yup
      .string()
      .email("Invalid email Id !")
      .required("Email is missing !"),
    oldPassword: yup.string().required("Old Password is missing"),
    newPassword: yup
      .string()
      .trim()
      .required("New Password is missing !")
      .min(8, "New Password is too short")
      .max(24, "New Password is too long !")
      .matches(
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#\$%\^&\*])[a-zA-Z\d!@#\$%\^&\*]+$/,
        "Password is too simple, please use alphanumeric with special characters !"
      ),
  }),
};

export default authSchemas;
