import type { QueryResolvers } from "../../types/generated";

const userQueryResolvers: QueryResolvers = {
  users: (_parent, _args, { prisma }) => {
    return prisma.user.findMany();
  },

  user: (_parent, { userId }, { prisma, userId: currentUserId }) => {
    return prisma.user.findUniqueOrThrow({
      where: { id: userId || currentUserId },
    });
  },
};

export default userQueryResolvers;
