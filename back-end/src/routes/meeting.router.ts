import { RouteConstants } from "#/constants";
import { authController } from "#/controllers/auth.controller";
import { meetingController } from "#/controllers/meeting.controller";
import {
  parseQueryStringMiddleware,
  validationMiddleware,
  isAuthUser,
  validateQuery,
} from "#/middleware";
import { meetingSchemas } from "#/validations";
import { Router } from "express";

const meetingRouter = Router();

meetingRouter.get(
  RouteConstants.MEETING.USER_LIST,
  isAuthUser,
  parseQueryStringMiddleware,
  validateQuery(meetingSchemas.getUserListForMeeting),
  meetingController.getUserListForMeeting
);

meetingRouter.post(
  "/",
  isAuthUser,
  validationMiddleware(meetingSchemas.createMeeting),
  meetingController.createMeeting
);

meetingRouter.delete(
  "/",
  isAuthUser,
  validationMiddleware(meetingSchemas.deleteMeeting),
  meetingController.deleteMeeting
);

meetingRouter.get(
  "/",
  isAuthUser,
  parseQueryStringMiddleware,
  validateQuery(meetingSchemas.getMeetingList),
  meetingController.getMeetingList
);

meetingRouter.put(
  "/",
  isAuthUser,
  validationMiddleware(meetingSchemas.updateMeeting),
  meetingController.updateMeeting
);

meetingRouter.get(
  RouteConstants.DETAILS,
  isAuthUser,
  parseQueryStringMiddleware,
  validateQuery(meetingSchemas.getMeetingDetailsById),
  meetingController.getMeetingDetailsById
);

meetingRouter.get(
  RouteConstants.MEETING.USER_STATUS,
  isAuthUser,
  parseQueryStringMiddleware,
  validateQuery(meetingSchemas.checkUserInMeetings),
  meetingController.checkUserInMeetings
);

export default meetingRouter;
