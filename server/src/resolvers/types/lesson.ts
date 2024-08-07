import { getIsVideoWatchedByUser } from "../../helpers/lesson-utils";
import { LessonResolvers } from "../../types/generated";

const lessonResolver: LessonResolvers = {
  pictureUrl: async ({ picturePath }, _, { minio }) => {
    if (!picturePath) return null;

    const url = await minio.getFileUrl(picturePath);
    return url;
  },

  totalDuration: async ({ id }, _args, { prisma }) => {
    const chapters = await prisma.chapter.findMany({
      where: { lessonId: id },
    });

    return chapters.reduce(
      (acc, chapter) => acc + (chapter.videoDuration || 0),
      0
    );
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
        chapter.videoDuration || 0
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
    const isOwner = true; // TODO: unmock

    return prisma.lesson.findUniqueOrThrow({ where: { id } }).chapters({
      where: { isPublished: isOwner ? true : undefined },
      orderBy: { position: "asc" },
    });
  },

  updatedAt: async ({ id }, _args, { prisma }) => {
    const chapters = await prisma.lesson
      .findUniqueOrThrow({ where: { id } })
      .chapters({ orderBy: { position: "desc" } });

    if (chapters.length === 0) return null;

    return chapters[0].updatedAt;
  },

  isPurchasedByCurrentUser: async ({ id }, _args, { prisma, userId }) => {
    if (!userId) throw new Error("userId missing");

    const purchase = await prisma.purchase.findUnique({
      where: { userId_lessonId: { userId, lessonId: id } },
    });

    return Boolean(purchase);
  },

  isCurrentUserTeacher: async ({ teacherId }, _args, { userId }) => {
    return teacherId === userId;
  },
};

export default lessonResolver;
