import { MeetingConstants } from "#/constants";
import { MeetingModalInterface } from "#/interface/meeting.interface";
import { Model, Schema, model, Types } from "mongoose";

const meetingSchema: Schema<MeetingModalInterface> = new Schema(
  {
    start_time: { type: String, required: true },
    end_time: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    is_delete: { type: Boolean, default: false },
    host_id: { type: Types.ObjectId, ref: "User", required: true },
    member_id: {
      type: [{ type: Types.ObjectId, ref: "User" }],
      required: [true, "At least one member is required"],
    },
    meeting_date: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
      enum: Object.values(MeetingConstants.MEETING_STATUS),
      default: MeetingConstants.MEETING_STATUS.SCHEDULED,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Meeting", meetingSchema) as Model<MeetingModalInterface>;
