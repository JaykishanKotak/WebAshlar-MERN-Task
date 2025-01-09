import {
  UserModalInterface,
  UserModalMethodsInterface,
} from "#/interface/user.interface";
import { compare, hash } from "bcrypt";
import { Model, Schema, model } from "mongoose";

const userSchema = new Schema<
  UserModalInterface,
  {},
  UserModalMethodsInterface
>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    is_delete: {
      type: Boolean,
      default: false,
    },
    token: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await hash(this.password, 10);
  }

  next();
});

userSchema.methods.comparePassword = async function (password) {
  const result = await compare(password, this.password);
  return result;
};

export default model("User", userSchema) as Model<
  UserModalInterface,
  {},
  UserModalMethodsInterface
>;
