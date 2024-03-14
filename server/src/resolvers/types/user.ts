import { UserResolvers } from "../../types/generated";

const userTypeResolver: UserResolvers = {
  fullName: ({ firstName, lastName }) => `${firstName} ${lastName}`,
};

export default userTypeResolver;
