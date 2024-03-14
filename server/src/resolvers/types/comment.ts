import { CommentResolvers } from "../../types/generated";

const commentResolver: CommentResolvers = {
  author: ({ id }, _args, { prisma }) => {
    return prisma.comment.findUniqueOrThrow({ where: { id } }).author();
  },

  chapter: ({ id }, _args, { prisma }) => {
    return prisma.comment.findUnique({ where: { id } }).chapter();
  },
};

export default commentResolver;
