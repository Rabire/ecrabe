import { Role } from "@prisma/client";
import { and, rule, shield } from "graphql-shield";
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
};

const permissions = shield(
  {
    Query: {
      lessons: rules.isAuth,
      lesson: rules.isAuth,
      chapter: rules.isAuth,
      users: and(rules.isAuth, rules.isAdmin),
    },
    Mutation: {
      // editComment: and(rules.isAuth, or(rules.isCommentAuthor, rules.isAdmin)),
      submitQuiz: rules.isAuth,
      saveVideoProgress: rules.isAuth,
      createLesson: rules.isAuth,
      updateLesson: rules.isAuth,
      upsertChapter: rules.isAuth,
    },
  },
  { allowExternalErrors: true }
);

export default permissions;
