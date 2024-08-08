import type { QueryResolvers } from "../../types/generated";

const lessonQueryResolvers: QueryResolvers = {
  browseLessons: async (_parent, { search, category }, { prisma, userId }) => {
    const lessons = await prisma.lesson.findMany({
      where: {
        isPublished: true,
        title: search ? { contains: search } : undefined,
        category: { name: category || undefined },
        teacherId: { not: userId },
      },
    });

    return lessons;
  },

  lesson: async (_parent, { lessonId }, { prisma, userId }) => {
    const isOwner = true; // TODO: unmock

    return prisma.lesson.findUniqueOrThrow({
      where: { id: lessonId, isPublished: isOwner ? true : undefined },
    });
  },
};

export default lessonQueryResolvers;
