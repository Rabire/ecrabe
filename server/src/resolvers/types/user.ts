import { UserResolvers } from "../../types/generated";

const userTypeResolver: UserResolvers = {
  fullName: ({ firstName, lastName }) => `${firstName} ${lastName}`,

  lessons: ({ id }, _args, { prisma }) => {
    return prisma.user
      .findUniqueOrThrow({
        where: { id },
      })
      .lessons();
  },
};

export default userTypeResolver;
