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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const exclude_from_object_1 = __importDefault(require("../../helpers/exclude-from-object"));
const userTypeResolver = {
    fullName: ({ firstName, lastName }) => `${firstName} ${lastName}`,
    contacts: (_a, _args_1, _b) => __awaiter(void 0, [_a, _args_1, _b], void 0, function* ({ id }, _args, { prisma }) {
        const contacts = yield prisma.user.findUnique({ where: { id } }).contacts();
        return contacts || [];
    }),
    profile: (_c, _args_2, _d) => __awaiter(void 0, [_c, _args_2, _d], void 0, function* ({ id }, _args, { prisma, userId }) {
        const isOwner = id === userId;
        const currentUser = yield prisma.user.findUnique({ where: { id: userId } });
        const isOwnerOrAdmin = isOwner || (currentUser === null || currentUser === void 0 ? void 0 : currentUser.role) === client_1.Role.ADMIN;
        const profile = yield prisma.user
            .findUniqueOrThrow({ where: { id } })
            .profile();
        if (!profile)
            return null;
        if (isOwnerOrAdmin)
            return profile;
        return (0, exclude_from_object_1.default)(profile, [
            "birthName",
            "nationality",
            "personalEmail",
            "dateOfBirth",
            "placeOfBirth",
            "countryOfBirth",
            "kycDocumentType",
            "kycDocumentNumber",
            "kycIssuedBy",
            "kycExpiresAt",
        ]);
    }),
    properties: (_e, _args_3, _f) => __awaiter(void 0, [_e, _args_3, _f], void 0, function* ({ id }, _args, { prisma }) {
        return prisma.user.findUniqueOrThrow({ where: { id } }).properties();
    }),
};
exports.default = userTypeResolver;
