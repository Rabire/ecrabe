import type { MutationResolvers } from "../../types/generated";

const commentMutationsResolvers: MutationResolvers = {
  createComment: async (
    _parent,
    { chapterId, content },
    { prisma, userId }
  ) => {
    return prisma.comment.create({
      data: {
        content,
        author: { connect: { id: userId } },
        chapter: { connect: { id: chapterId } },
      },
    });
  },

  deleteComment: async (_parent, { commentId }, { prisma }) => {
    return await prisma.comment.update({
      where: { id: commentId },
      data: { deletedAt: new Date() },
    });
  },

  editComment: async (_parent, { commentId, content }, { prisma }) => {
    const prevComment = await prisma.comment.findUniqueOrThrow({
      where: { id: commentId },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...restPrevComment } = prevComment;

    const newComment = prisma.comment.create({
      data: {
        ...restPrevComment,
        content,
        previousComment: { connect: { id: commentId } },
      },
    });

    return newComment;
  },
};

export default commentMutationsResolvers;
