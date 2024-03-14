import type { QueryResolvers } from "../../types/generated";

const lessonQueryResolvers: QueryResolvers = {
  lessons: async (_parent, _args, { prisma }) => {
    const lessons = await prisma.lesson.findMany();

    return lessons;
  },

  lesson: async (_parent, { lessonId }, { prisma }) => {
    if (!lessonId) return null;

    const lesson = await prisma.lesson.findUniqueOrThrow({
      where: { id: lessonId },
    });

    return lesson;
  },
};

export default lessonQueryResolvers;
