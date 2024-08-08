import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { COOKIE_NAME } from "../../helpers/env-variables";
import { generateTokens, verifyRefreshToken } from "../../helpers/jwt";
import { type MutationResolvers } from "../../types/generated";

const userMutationsResolvers: MutationResolvers = {
  registerUser: async (_parent, { input }, { prisma, stripe }) => {
    const { password, ...restInput } = input;

    const hashedPassword = await bcrypt.hash(password, 10);

    const userId = uuidv4();

    const customer = await stripe.customers.create({
      name: `${restInput.firstName} ${restInput.lastName}`,
      email: restInput.email,
      metadata: { userId },
    });

    const user = await prisma.user.create({
      data: {
        id: userId,
        ...restInput,
        hashedPassword,
        stripeCustomerId: customer.id,
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

  refreshToken: async (_parent, _args, { req, prisma }) => {
    const cookies = JSON.parse((req.headers.cookies as string) || "{}");

    const refreshToken = cookies[COOKIE_NAME || "COOKIE_NAME"];

    if (!refreshToken) throw new Error("No refresh token");

    const { userId } = verifyRefreshToken(refreshToken);

    await prisma.user.update({
      where: { id: userId },
      data: { lastLogin: new Date() },
    });

    return generateTokens(userId);
  },
};

export default userMutationsResolvers;
