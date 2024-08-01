import { getIsVideoWatchedByUser } from "../../helpers/lesson-utils";
import { ChapterResolvers } from "../../types/generated";

const chapterResolver: ChapterResolvers = {
  isVideoWatchedByUser: async (
    { id, videoDuration },
    _args,
    { prisma, userId }
  ) => {
    if (!userId) throw new Error("User not found");

    const userVideoProgress = await prisma.userVideoProgress.findUnique({
      where: { chapterId_userId: { chapterId: id, userId } },
    });

    if (!userVideoProgress) return false; // user has not watched the video

    return getIsVideoWatchedByUser(
      userVideoProgress.watchedUntil,
      videoDuration || 0
    );
  },

  isQuizCompletedByUser: async ({ id }, _args, { prisma, userId }) => {
    const userAnswer = await prisma.chapterQuestionsAnswers.findFirst({
      where: { userId, chapterId: id },
    });

    return Boolean(userAnswer);
  },

  videoUrl: async ({ videoPath }, _, { minio }) => {
    if (!videoPath) return null;

    const url = await minio.getFileUrl(videoPath);

    return url;
  },

  userVideoWatchProgress: async ({ id }, _args, { prisma, userId }) => {
    if (!userId) throw new Error("User not found");

    const userVideoProgress = await prisma.userVideoProgress.findUnique({
      where: { chapterId_userId: { chapterId: id, userId } },
    });

    return userVideoProgress?.watchedUntil || 0;
  },

  lesson: async ({ lessonId }, _args, { prisma }) => {
    return await prisma.lesson.findUniqueOrThrow({ where: { id: lessonId } });
  },

  questions: async ({ id }, _args, { prisma }) => {
    return prisma.chapter.findUniqueOrThrow({ where: { id } }).questions();
  },

  // comments: ({ id }, _args, { prisma }) => {
  //   return prisma.chapter.findUniqueOrThrow({ where: { id } }).comments({
  //     where: { deletedAt: null, editedCommentId: null },
  //     orderBy: { createdAt: "desc" },
  //   });
  // }, // FIXME:

  hasQuestions: async ({ id }, _args, { prisma }) => {
    const questions = await prisma.chapter
      .findUniqueOrThrow({ where: { id } })
      .questions();

    return questions.length > 0;
  }, // useless ?
};

export default chapterResolver;
