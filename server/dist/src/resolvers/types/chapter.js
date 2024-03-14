"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const lesson_utils_1 = require("../../helpers/lesson-utils");
const chapterResolver = {
    isVideoWatchedByUser: (_a, _args_1, _b) => __awaiter(void 0, [_a, _args_1, _b], void 0, function* ({ id, videoDuration }, _args, { prisma, userId }) {
        if (!userId)
            throw new Error("User not found");
        const userVideoProgress = yield prisma.userVideoProgress.findUnique({
            where: { chapterId_userId: { chapterId: id, userId } },
        });
        if (!userVideoProgress)
            return false; // user has not watched the video
        return (0, lesson_utils_1.getIsVideoWatchedByUser)(userVideoProgress.watchedUntil, videoDuration);
    }),
    isQuizCompletedByUser: (_c, _args_2, _d) => __awaiter(void 0, [_c, _args_2, _d], void 0, function* ({ id }, _args, { prisma, userId }) {
        const userAnswer = yield prisma.chapterQuestionsAnswers.findFirst({
            where: { userId, chapterId: id },
        });
        return Boolean(userAnswer);
    }),
    videoUrl: (_e, _1, _f) => __awaiter(void 0, [_e, _1, _f], void 0, function* ({ videoPath }, _, { minio }) {
        const url = yield minio.getFileUrl(videoPath);
        return url;
    }),
    userVideoWatchProgress: (_g, _args_3, _h) => __awaiter(void 0, [_g, _args_3, _h], void 0, function* ({ id }, _args, { prisma, userId }) {
        if (!userId)
            throw new Error("User not found");
        const userVideoProgress = yield prisma.userVideoProgress.findUnique({
            where: { chapterId_userId: { chapterId: id, userId } },
        });
        return (userVideoProgress === null || userVideoProgress === void 0 ? void 0 : userVideoProgress.watchedUntil) || 0;
    }),
    lesson: (_j, _args_4, _k) => __awaiter(void 0, [_j, _args_4, _k], void 0, function* ({ lessonId }, _args, { prisma }) {
        return yield prisma.lesson.findUniqueOrThrow({ where: { id: lessonId } });
    }),
    questions: (_l, _args_5, _m) => __awaiter(void 0, [_l, _args_5, _m], void 0, function* ({ id }, _args, { prisma }) {
        return prisma.chapter.findUniqueOrThrow({ where: { id } }).questions();
    }),
    comments: ({ id }, _args, { prisma }) => {
        return prisma.chapter.findUniqueOrThrow({ where: { id } }).comments({
            where: { deletedAt: null, editedCommentId: null },
            orderBy: { createdAt: "desc" },
        });
    },
    hasQuestions: (_o, _args_6, _p) => __awaiter(void 0, [_o, _args_6, _p], void 0, function* ({ id }, _args, { prisma }) {
        const quesitons = yield prisma.chapter
            .findUniqueOrThrow({ where: { id } })
            .questions();
        return quesitons.length > 0;
    }),
};
exports.default = chapterResolver;
