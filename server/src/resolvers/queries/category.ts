import type { QueryResolvers } from "../../types/generated";

const categoryQueryResolvers: QueryResolvers = {
  categories: async (_parent, _args, { prisma }) => {
    return prisma.category.findMany();
  },
};

export default categoryQueryResolvers;
