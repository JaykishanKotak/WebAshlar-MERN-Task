import { MessageConstants } from "#/constants";
import {
  createMeetingInterface,
  deleteMeetingInterface,
  getMeetingDetailsByIdInterfaceInterface,
  getMeetingListInterface,
  updateMeetingInterface,
} from "#/interface/meeting.interface";
import { Meeting, User } from "#/models";
import {
  getSelectedUserMeetingStatus,
  getUserListForMeetingInterface,
} from "./../interface/user.interface";

const {
  MEETING_CREATED,
  MEETING_DELETED,
  MEETING_NOT_FOUND,
  NO_USER_FOUND,
  USER_FOUND,
  MEETING_UPDATE,
  USER_IN_MEETING,
  USER_NOT_IN_MEETING,
} = MessageConstants.MEETING;

class MeetingController {
  async createMeeting(req: createMeetingInterface, res: any) {
    const { title, description, startTime, endTime, attendees, meetingDate } =
      req.body;
    const hostId = (req as any).user.userId;
    const memberIds = attendees.map((attende) => attende._id);

    await Meeting.create({
      title,
      description,
      host_id: hostId,
      member_id: memberIds,
      start_time: startTime,
      end_time: endTime,
      meeting_date: meetingDate,
    });

    res.status(201).json({
      message: MEETING_CREATED,
    });
  }

  async updateMeeting(req: updateMeetingInterface, res: any) {
    const {
      meetingId,
      title,
      description,
      startTime,
      endTime,
      attendees,
      meetingDate,
    } = req.body;

    const hostId = (req as any).user.userId;
    const memberIds = attendees.map((attendee) => attendee._id);

    await Meeting.findByIdAndUpdate(
      meetingId,
      {
        title,
        description,
        host_id: hostId,
        member_id: memberIds,
        start_time: startTime,
        end_time: endTime,
        meeting_date: meetingDate,
      },
      { new: true }
    );

    res.status(200).json({
      message: MEETING_UPDATE,
    });
  }

  async deleteMeeting(req: deleteMeetingInterface, res: any) {
    const { meetingId } = req.body;

    const meetingDetails = await Meeting.findById(meetingId);

    if (!meetingDetails) {
      return res.status(404).json({ message: MEETING_NOT_FOUND });
    }

    await Meeting.findOneAndUpdate(
      { _id: meetingId },
      {
        is_delete: true,
      }
    );

    res.status(200).json({
      message: MEETING_DELETED,
    });
  }

  async getMeetingList(req: getMeetingListInterface, res: any) {
    const { pageNumber = 1, limit = 10 } = req.query;
    const hostId = (req as any).user.userId;

    const totalRecords = await Meeting.countDocuments({
      host_id: hostId,
      is_delete: false,
    });

    if (totalRecords === 0) {
      return res.status(404).json({ message: MEETING_NOT_FOUND });
    }

    const meetings = await Meeting.find({
      host_id: hostId,
      is_delete: false,
    })
      .sort({
        createdAt: -1,
      })
      .skip(Number(pageNumber - 1) * Number(limit))
      .limit(Number(limit));

    if (meetings.length === 0) {
      return res.status(404).json({ message: MEETING_NOT_FOUND });
    }

    res.status(200).json({
      data: { meetings, count: totalRecords },
    });
  }

  async getMeetingDetailsById(
    req: getMeetingDetailsByIdInterfaceInterface,
    res: any
  ) {
    const { meetingId } = req.query;

    const meetingDetails = await Meeting.findById(meetingId)
      .select("-createdAt -updatedAt -is_delete -status")
      .populate({
        path: "member_id",
        select: "_id name email",
      });

    if (!meetingDetails) {
      return res.status(404).json({ message: MEETING_NOT_FOUND });
    }

    const transformedDetails: any = {
      ...meetingDetails.toObject(),
      attendees: meetingDetails.member_id,
    };
    delete transformedDetails.member_id;

    res.status(200).json({
      data: transformedDetails,
    });
  }

  async checkUserInMeetings(req: getSelectedUserMeetingStatus, res: any) {
    const { userId } = req.query;

    const meeting = await Meeting.findOne({
      member_id: { $in: [userId] },
    });

    if (meeting) {
      res.status(200).json({
        isUserAvaliable: false,
        message: USER_IN_MEETING,
      });
    } else {
      res.status(200).json({
        isUserAvaliable: true,
        message: USER_NOT_IN_MEETING,
      });
    }
  }

  async getUserListForMeeting(req: getUserListForMeetingInterface, res: any) {
    const { searchText } = req.query;

    const userList: getUserListForMeetingInterface[] = await User.find(
      {
        $and: [
          { name: { $regex: searchText, $options: "i" } },
          { email: { $regex: searchText, $options: "i" } },
        ],
      },
      {
        _id: 1,
        name: 1,
        email: 1,
      }
    );

    if (userList.length === 0) {
      res.status(404).json({
        message: NO_USER_FOUND,
      });
    }

    res.status(200).json({
      data: userList,
      message: USER_FOUND,
    });
  }
}

export const meetingController = new MeetingController();
