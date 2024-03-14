import type { QueryResolvers } from "../../types/generated";

const chapterQueryResolvers: QueryResolvers = {
  chapter: async (_parent, { chapterId }, { prisma }) => {
    if (!chapterId) return null;

    const chapter = await prisma.chapter.findUniqueOrThrow({
      where: { id: chapterId },
    });

    return chapter;
  },
};

export default chapterQueryResolvers;
