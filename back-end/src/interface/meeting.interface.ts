import { ObjectId, Document } from "mongoose";
import { Request } from "express";
import { ParsedQs } from "qs";

export interface MeetingModalInterface extends Document {
  _id: ObjectId;
  start_time: string;
  end_time: string;
  meeting_date: string;
  title: string;
  description: string;
  is_delete: boolean;
  host_id: ObjectId;
  status: number;
  member_id: ObjectId[];
}

export interface createMeetingInterface extends Request {
  body: {
    title: string;
    description: string;
    hostId?: ObjectId;
    attendees: {
      _id: string;
      name: string;
      email: string;
    }[];
    startTime: any;
    endTime: any;
    meetingDate: any;
  };
}

export interface updateMeetingInterface extends Request {
  body: {
    meetingId: ObjectId;
    title: string;
    description: string;
    hostId?: ObjectId;
    attendees: {
      _id: string;
      name: string;
      email: string;
    }[];
    startTime: any;
    endTime: any;
    meetingDate: any;
  };
}

export interface deleteMeetingInterface extends Request {
  body: { meetingId: ObjectId };
}

export interface getMeetingListInterface extends Request {
  query: ParsedQs & {
    searchText?: string;
    pageNumber?: number;
    limit?: number;
  };
}

export interface getMeetingDetailsByIdInterfaceInterface extends Request {
  query: ParsedQs & {
    meetingId: number;
  };
}
