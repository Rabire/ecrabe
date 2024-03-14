import type { QueryResolvers } from "../../types/generated";

const userQueryResolvers: QueryResolvers = {
  users: (_parent, _args, { prisma }) => {
    return prisma.user.findMany();
  },
};

export default userQueryResolvers;
