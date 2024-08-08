import { UserResolvers } from "../../types/generated";

const userTypeResolver: UserResolvers = {
  fullName: ({ firstName, lastName }) => `${firstName} ${lastName}`,

  createdLessons: ({ id }, _args, { prisma }) => {
    return prisma.user.findUniqueOrThrow({ where: { id } }).createdLessons();
  },

  purchases: ({ id }, _args, { prisma }) => {
    return prisma.user.findUniqueOrThrow({ where: { id } }).purchases();
  },

  comments: ({ id }, _args, { prisma }) => {
    return prisma.user.findUniqueOrThrow({ where: { id } }).comments();
  },
};

export default userTypeResolver;
