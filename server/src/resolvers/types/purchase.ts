import { PurchaseResolvers } from "../../types/generated";

const purchaseTypeResolver: PurchaseResolvers = {
  lesson: ({ id }, _args, { prisma }) => {
    return prisma.purchase.findUniqueOrThrow({ where: { id } }).lesson();
  },

  user: ({ id }, _args, { prisma }) => {
    return prisma.purchase.findUniqueOrThrow({ where: { id } }).user();
  },
};

export default purchaseTypeResolver;
