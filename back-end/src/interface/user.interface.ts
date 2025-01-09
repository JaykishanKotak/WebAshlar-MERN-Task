import { ObjectId } from "mongoose";
import { ParsedQs } from "qs";

export interface UserModalInterface {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  is_delete: boolean;
  token: string;
}

export interface UserModalMethodsInterface {
  comparePassword(token: string): Promise<boolean>;
}

export interface getUserListForMeetingInterface extends Request {
  query: ParsedQs & {
    name: string;
    email: string;
    _id: ObjectId;
  };
}

export interface getSelectedUserMeetingStatus extends Request {
  query: ParsedQs & {
    userId: ObjectId;
  };
}
