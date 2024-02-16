import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import { addAnswer, addQuestion, addReplyToReview, addReview, editCourse, getAllCourses, getAllCoursesAdmin, getCourseContent, getSignleCourse, uploadCourse } from "../controllers/courseController";
const courseRouter = express.Router();

courseRouter.post(
  "/create-course",
  isAuthenticated,
  authorizeRoles("admin"),
  uploadCourse
);
courseRouter.put(
  "/edit-course/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  editCourse
);
courseRouter.get(
  "/get-course/:id",
  getSignleCourse
);
courseRouter.get(
  "/get-courses",
  getAllCourses
);
courseRouter.get(
  "/get-course-content/:id",
  isAuthenticated,
  getCourseContent
);
courseRouter.put(
  "/add-question",
  isAuthenticated,
  addQuestion
);
courseRouter.put(
  "/add-answer",
  isAuthenticated,
  addAnswer
);
courseRouter.put(
  "/add-review/:id",
  isAuthenticated,
  addReview
);
courseRouter.put(
  "/add-reply",
  isAuthenticated,
  authorizeRoles('admin'),
  addReplyToReview
);

courseRouter.get(
  "/get-all-courses",
  isAuthenticated,
  authorizeRoles('admin'),
  getAllCoursesAdmin
);

export default courseRouter;
