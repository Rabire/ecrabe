import bcrypt from "bcrypt";
import { generateTokens, verifyRefreshToken } from "../../helpers/jwt";
import { type MutationResolvers } from "../../types/generated";

const userMutationsResolvers: MutationResolvers = {
  registerUser: async (_parent, { input }, { prisma }) => {
    const { password, ...restInput } = input;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        ...restInput,
        hashedPassword,
      },
    });

    return { tokens: generateTokens(user.id), user };
  },

  loginUser: async (_parent, { email, password }, { prisma }) => {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) throw new Error("Invalid credentials");

    const valid = await bcrypt.compare(password, user.hashedPassword);

    if (!valid) throw new Error("Invalid credentials");

    return { tokens: generateTokens(user.id), user };
  },

  refreshToken: async (_parent, { token }) => {
    const { userId } = verifyRefreshToken(token);

    return generateTokens(userId);
  },
};

export default userMutationsResolvers;
