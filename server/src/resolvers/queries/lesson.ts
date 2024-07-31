import type { QueryResolvers } from "../../types/generated";

const lessonQueryResolvers: QueryResolvers = {
  lessons: async (_parent, _args, { prisma }) => {
    const lessons = await prisma.lesson.findMany();

    return lessons;
  },

  lesson: async (_parent, { lessonId }, { prisma }) => {
    return prisma.lesson.findUniqueOrThrow({
      where: { id: lessonId },
    });
  },
};

export default lessonQueryResolvers;
