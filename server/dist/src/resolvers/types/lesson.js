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
const lessonResolver = {
    pictureUrl: (_a, _1, _b) => __awaiter(void 0, [_a, _1, _b], void 0, function* ({ picturePath }, _, { minio }) {
        const url = yield minio.getFileUrl(picturePath);
        return url;
    }),
    totalDuration: (_c, _args_1, _d) => __awaiter(void 0, [_c, _args_1, _d], void 0, function* ({ id }, _args, { prisma }) {
        const chapters = yield prisma.chapter.findMany({
            where: { lessonId: id },
        });
        return chapters.reduce((acc, chapter) => acc + chapter.videoDuration, 0);
    }),
    userProgress: (_e, _args_2, _f) => __awaiter(void 0, [_e, _args_2, _f], void 0, function* ({ id }, _args, { prisma }) {
        const rawChapters = yield prisma.lesson
            .findUniqueOrThrow({ where: { id } })
            .chapters({
            include: {
                usersVideoProgress: true,
                chapterQuestionsAnswers: true,
            },
        });
        const chapters = rawChapters.map((chapter) => {
            var _a;
            return (Object.assign({ isVideoWatchedByUser: (0, lesson_utils_1.getIsVideoWatchedByUser)(((_a = chapter.usersVideoProgress[0]) === null || _a === void 0 ? void 0 : _a.watchedUntil) || 0, chapter.videoDuration), isQuizCompletedByUser: chapter.chapterQuestionsAnswers.length > 0 }, chapter));
        });
        const elementsCompleted = chapters
            .map((chapter) => [
            chapter.isVideoWatchedByUser,
            chapter.isQuizCompletedByUser,
        ])
            .flat(1);
        const userProgress = Math.abs((elementsCompleted.filter(Boolean).length || 0) / elementsCompleted.length);
        if (isNaN(userProgress))
            return 0;
        return Math.floor(userProgress * 100);
    }),
    teacher: ({ id }, _args, { prisma }) => {
        return prisma.lesson.findUniqueOrThrow({ where: { id } }).teacher();
    },
    chapters: ({ id }, _args, { prisma }) => {
        return prisma.lesson.findUniqueOrThrow({ where: { id } }).chapters({
            orderBy: { order: "asc" },
        });
    },
    similarLessons: ({ id, type }, _args, { prisma }) => {
        return prisma.lesson.findMany({ where: { type, NOT: { id } } });
    },
    updatedAt: (_g, _args_3, _h) => __awaiter(void 0, [_g, _args_3, _h], void 0, function* ({ id }, _args, { prisma }) {
        const chapters = yield prisma.lesson
            .findUniqueOrThrow({ where: { id } })
            .chapters({ orderBy: { order: "desc" } });
        if (chapters.length === 0)
            return null;
        return chapters[0].updatedAt;
    }),
};
exports.default = lessonResolver;
