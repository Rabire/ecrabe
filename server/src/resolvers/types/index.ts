import chapterResolver from "./chapter";
import lessonResolver from "./lesson";
import userResolver from "./user";

export default {
  User: userResolver,
  Lesson: lessonResolver,
  Chapter: chapterResolver,
  //   Chapter: chapterResolver,
  //   Comment: commentResolver,
};
