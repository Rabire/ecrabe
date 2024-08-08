import { Role } from "@prisma/client";
import { rule, shield } from "graphql-shield";
import { GraphQLContext } from "./context";

const rules = {
  isAuth: rule()((_parent, _args, { userId }: GraphQLContext) => {
    if (!userId) return "Invalid token";

    return true;
  }),

  isAdmin: rule()(
    async (_parent, _args, { userId, prisma }: GraphQLContext) => {
      const user = await prisma.user.findUnique({ where: { id: userId } });

      if (user?.role !== Role.ADMIN)
        return "You must be an admin to perform this action";
      return true;
    }
  ),

  isCommentAuthor: rule()(
    async (_parent, { commentId }, { userId, prisma }: GraphQLContext) => {
      const commentFound = await prisma.comment.findUnique({
        where: { id: commentId, authorId: userId },
      });

      if (!commentFound) return "User is not the author of the given comment";
      return true;
    }
  ),

  isCurrentUser: rule()(
    async (_parent, { userId: userIdParam }, { userId }: GraphQLContext) => {
      if (!userIdParam) return true;
      if (userId !== userIdParam) return "User is not the current user";
      return true;
    }
  ),

  isLessonOwner: rule()(
    async (_parent, { lessonId }, { userId, prisma }: GraphQLContext) => {
      if (!lessonId) return true;

      const chapter = await prisma.lesson.findUnique({
        where: { id: lessonId },
      });

      if (chapter?.teacherId !== userId) return "User is not the lesson owner";

      return true;
    }
  ),
};

const permissions = shield(
  {
    Query: {
      browseLessons: rules.isAuth,
      categories: rules.isAuth,
      lesson: rules.isAuth,
      chapter: rules.isAuth,
      users: rules.isAdmin,
      user: rules.isCurrentUser,
    },
    Mutation: {
      submitQuiz: rules.isAuth,
      saveVideoProgress: rules.isAuth,
      createLesson: rules.isAuth,
      updateLesson: rules.isAuth,
      upsertChapter: rules.isLessonOwner,
      // registerUser
      // loginUser
      // refreshToken
      createCategory: rules.isAdmin,
      orderChapters: rules.isAdmin,
    },
  },
  { allowExternalErrors: true }
);

export default permissions;
