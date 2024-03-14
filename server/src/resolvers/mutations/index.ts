import lessonMutationsResolvers from "./lesson";
import userMutationsResolvers from "./user";

export default {
  ...lessonMutationsResolvers,
  ...userMutationsResolvers,
};
