import { getIsVideoWatchedByUser } from "../../helpers/lesson-utils";
import { LessonResolvers } from "../../types/generated";

const lessonResolver: LessonResolvers = {
  pictureUrl: async ({ picturePath }, _, { minio }) => {
    const url = await minio.getFileUrl(picturePath);

    return url;
  },

  totalDuration: async ({ id }, _args, { prisma }) => {
    const chapters = await prisma.chapter.findMany({
      where: { lessonId: id },
    });

    return chapters.reduce((acc, chapter) => acc + chapter.videoDuration, 0);
  },

  userProgress: async ({ id }, _args, { prisma }) => {
    const rawChapters = await prisma.lesson
      .findUniqueOrThrow({ where: { id } })
      .chapters({
        include: {
          usersVideoProgress: true,
          chapterQuestionsAnswers: true,
        },
      });

    const chapters = rawChapters.map((chapter) => ({
      isVideoWatchedByUser: getIsVideoWatchedByUser(
        chapter.usersVideoProgress[0]?.watchedUntil || 0,
        chapter.videoDuration
      ),
      isQuizCompletedByUser: chapter.chapterQuestionsAnswers.length > 0,
      ...chapter,
    }));

    const elementsCompleted = chapters
      .map((chapter) => [
        chapter.isVideoWatchedByUser,
        chapter.isQuizCompletedByUser,
      ])
      .flat(1);

    const userProgress = Math.abs(
      (elementsCompleted.filter(Boolean).length || 0) / elementsCompleted.length
    );

    if (isNaN(userProgress)) return 0;

    return Math.floor(userProgress * 100);
  },

  teacher: ({ id }, _args, { prisma }) => {
    return prisma.lesson.findUniqueOrThrow({ where: { id } }).teacher();
  },

  chapters: ({ id }, _args, { prisma }) => {
    return prisma.lesson.findUniqueOrThrow({ where: { id } }).chapters({
      orderBy: { order: "asc" },
    });
  },

  updatedAt: async ({ id }, _args, { prisma }) => {
    const chapters = await prisma.lesson
      .findUniqueOrThrow({ where: { id } })
      .chapters({ orderBy: { order: "desc" } });

    if (chapters.length === 0) return null;

    return chapters[0].updatedAt;
  },
};

export default lessonResolver;
