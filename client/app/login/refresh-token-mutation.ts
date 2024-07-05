import { gql } from "graphql-tag";

const refreshTokenMutation = gql`
  mutation Mutation {
    refreshToken {
      accessToken
      refreshToken
    }
  }
`;

export default refreshTokenMutation;
