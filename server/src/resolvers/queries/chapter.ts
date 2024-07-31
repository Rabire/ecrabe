import type { QueryResolvers } from "../../types/generated";

const chapterQueryResolvers: QueryResolvers = {
  chapter: async (_parent, { chapterId }, { prisma }) => {
    return prisma.chapter.findUniqueOrThrow({
      where: { id: chapterId },
    });
  },
};

export default chapterQueryResolvers;
