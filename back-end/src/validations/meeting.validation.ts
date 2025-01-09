import * as yup from "yup";

const meetingSchemas = {
  createMeeting: yup.object().shape({
    meetingDate: yup.string().required("Please select meeting date"),
    attendees: yup.array().of(
      yup.object().shape({
        _id: yup.string().required("Attendee ID is required"),
        name: yup.string().required("Attendee name is required"),
        email: yup
          .string()
          .email("Invalid email")
          .required("Attendee email is required"),
      })
    ),
    endTime: yup.string().required("Meeting end time is required"),
    startTime: yup.string().required("Meeting start time is required"),
    description: yup.string().optional(),
    title: yup.string().required("Meeting title is required"),
  }),

  updateMeeting: yup.object().shape({
    meetingId: yup.string().required("Meeting ID is required"),
    meetingDate: yup.string().required("Please select meeting date"),
    attendees: yup.array().of(
      yup.object().shape({
        _id: yup.string().required("Attendee ID is required"),
        name: yup.string().required("Attendee name is required"),
        email: yup
          .string()
          .email("Invalid email")
          .required("Attendee email is required"),
      })
    ),
    endTime: yup.string().required("Meeting end time is required"),
    startTime: yup.string().required("Meeting start time is required"),
    description: yup.string().optional(),
    title: yup.string().required("Meeting title is required"),
  }),

  deleteMeeting: yup.object().shape({
    meetingId: yup.string().required("Meeting Id is required"),
  }),

  getUserListForMeeting: yup.object().shape({
    searchText: yup.string().trim().required("Search text missing !"),
  }),

  getMeetingList: yup.object().shape({
    searchText: yup.string().trim(),
    pageNumber: yup.number().required("Page Number is required"),
    limit: yup.number().required("Limit is required"),
  }),

  getMeetingDetailsById: yup.object().shape({
    meetingId: yup.string().required("Meeting Id is required"),
  }),

  checkUserInMeetings: yup.object().shape({
    userId: yup.string().required("User Id is required"),
  }),
};

export default meetingSchemas;
