import { CommentResolvers } from "../../types/generated";

const commentResolver: CommentResolvers = {
  author: ({ id }, _args, { prisma }) => {
    return prisma.comment.findUniqueOrThrow({ where: { id } }).author();
  },
};

export default commentResolver;
