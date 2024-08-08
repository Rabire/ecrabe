import categoryQueryResolvers from "./category";
import chapterQueryResolvers from "./chapter";
import lessonQueryResolvers from "./lesson";
import userQueryResolvers from "./user";

export default {
  ...lessonQueryResolvers,
  ...chapterQueryResolvers,
  ...userQueryResolvers,
  ...categoryQueryResolvers,
};
