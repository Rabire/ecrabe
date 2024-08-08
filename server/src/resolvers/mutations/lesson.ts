import { v4 as uuidv4 } from "uuid";
import { IMAGES_MIMES, VIDEO_MIME } from "../../helpers/files-utils";
import { type MutationResolvers } from "../../types/generated";

const lessonMutationsResolvers: MutationResolvers = {
  submitQuiz: async (_parent, { chapterId, answers }, { prisma, userId }) => {
    if (!userId) throw new Error("userId missing");

    await new Promise((resolve) => setTimeout(resolve, 1000)); // suspense

    const chapter = await prisma.chapter.findUniqueOrThrow({
      where: { id: chapterId },
      include: {
        questions: true,
        chapterQuestionsAnswers: { where: { userId } },
      },
    });

    const incorrectQuestionsId = chapter.questions
      .filter((question) => {
        const answer = answers.find(
          (answer) => answer.questionId === question.id
        );
        return answer?.answer !== question.correctAnswer;
      })
      .map((question) => question.id);

    const isValid = incorrectQuestionsId.length === 0;

    if (isValid && chapter.chapterQuestionsAnswers.length === 0) {
      await prisma.chapterQuestionsAnswers.create({
        data: { chapterId, userId, answeredAt: new Date() },
      });
    }

    return { isValid, incorrectQuestionsId };
  },

  saveVideoProgress: async (
    _parent,
    { chapterId, watchedUntil },
    { prisma, userId }
  ) => {
    if (!userId) throw new Error("userId missing");

    await prisma.userVideoProgress.upsert({
      where: { chapterId_userId: { chapterId, userId } },
      update: { watchedUntil },
      create: { chapterId, userId, watchedUntil },
    });

    return true;
  },

  updateLesson: async (_parent, { lessonId, input }, { prisma, minio }) => {
    const { pictureFile, category, title, ...restInput } = input;

    const picturePath =
      pictureFile &&
      (await minio.saveFile({
        file: pictureFile,
        allowedMimes: IMAGES_MIMES,
        fileId: lessonId,
      }));

    const lesson = await prisma.lesson.update({
      where: { id: lessonId },
      data: {
        ...restInput,
        title: title ?? undefined,
        picturePath,
        category: category
          ? {
              connectOrCreate: {
                where: { name: category.toLowerCase() },
                create: { name: category.toLowerCase() },
              },
            }
          : undefined,
      },
    });

    return lesson;
  },

  createLesson: async (_parent, { title }, { prisma, userId }) => {
    const lesson = await prisma.lesson.create({
      data: {
        title,
        teacher: { connect: { id: userId } },
      },
    });

    return lesson;
  },

  upsertChapter: async (
    _parent,
    { lessonId, chapterId, input, videoFile },
    { prisma, minio }
  ) => {
    const id = chapterId || uuidv4();

    const fileName =
      videoFile &&
      (await minio.saveFile({
        file: videoFile,
        allowedMimes: VIDEO_MIME,
        fileId: id,
      }));

    const { questions, ...restInput } = input;

    const lesson = await prisma.chapter.upsert({
      where: { id },
      update: {
        ...restInput,
        videoPath: fileName || undefined,
        questions: {
          deleteMany: {},
          create: questions,
        },
      },
      create: {
        ...restInput,
        videoPath: fileName || "something went very wrong",
        lesson: { connect: { id: lessonId } },
        questions: { create: questions },
      },
    });

    return lesson;
  },

  orderChapters: async (_parent, { chaptersOrder, lessonId }, { prisma }) => {
    for (let item of chaptersOrder) {
      await prisma.chapter.update({
        where: { id: item.chapterId, lessonId },
        data: { position: item.position },
      });
    }

    return true;
  },
};

export default lessonMutationsResolvers;
