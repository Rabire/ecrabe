import type { QueryResolvers } from "../../types/generated";

const chapterQueryResolvers: QueryResolvers = {
  chapter: async (_parent, { chapterId }, { prisma, userId }) => {
    const chapter = await prisma.chapter.findUniqueOrThrow({
      where: { id: chapterId },
      include: { lesson: true },
    });

    const canViewChapter =
      chapter.isFree || userId === chapter.lesson.teacherId;

    return {
      ...chapter,
      markdownContent: canViewChapter ? chapter.markdownContent : null,
    };
  },
};

export default chapterQueryResolvers;
