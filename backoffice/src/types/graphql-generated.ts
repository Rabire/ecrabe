/* eslint-disable */
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: Date; output: Date; }
  Upload: { input: any; output: any; }
};

export type Chapter = {
  __typename?: 'Chapter';
  comments: Array<Comment>;
  hasQuestions: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  isQuizCompletedByUser: Scalars['Boolean']['output'];
  isVideoWatchedByUser: Scalars['Boolean']['output'];
  lesson: Lesson;
  /** A description of the chapter content or presentation - in markdown format. */
  markdownContent?: Maybe<Scalars['String']['output']>;
  /** An integer representing the order of the chapter in the lesson. */
  order: Scalars['Int']['output'];
  questions: Array<Question>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  /** Percentage of video watched by user */
  userVideoWatchProgress: Scalars['Int']['output'];
  /** Duration of the video in seconds. */
  videoDuration: Scalars['Int']['output'];
  videoUrl: Scalars['String']['output'];
};

export type ChapterInput = {
  /** A description of the chapter content or presentation - in markdown format. */
  markdownContent?: InputMaybe<Scalars['String']['input']>;
  questions: Array<QuestionInput>;
  title: Scalars['String']['input'];
  /** Duration of the video in seconds. */
  videoDuration: Scalars['Int']['input'];
};

export type Comment = {
  __typename?: 'Comment';
  author: User;
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
};

export type Lesson = {
  __typename?: 'Lesson';
  chapters: Array<Chapter>;
  /** A short description of the lesson. */
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  /** A description of the lesson content or presentation - in markdown format. */
  markdownContent?: Maybe<Scalars['String']['output']>;
  /** The URL of the cover picture of the lesson. */
  pictureUrl: Scalars['String']['output'];
  teacher: User;
  title: Scalars['String']['output'];
  /** Duration of the lesson in seconds. */
  totalDuration: Scalars['Int']['output'];
  /** Date of the last update of a nested chapter. */
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Completion percentage of lessons watch & quiz */
  userProgress: Scalars['Int']['output'];
};

export type LessonInput = {
  /** The URL of the cover picture of the lesson. */
  description: Scalars['String']['input'];
  /** A description of the lesson content or presentation - in markdown format. */
  markdownContent?: InputMaybe<Scalars['String']['input']>;
  sortedChapterIds?: InputMaybe<Array<Scalars['String']['input']>>;
  title: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  loginUser: UserWithTokens;
  refreshToken: Tokens;
  registerUser: UserWithTokens;
  /** Upsert a user video watch progress */
  saveVideoProgress: Scalars['Boolean']['output'];
  /** Check user responses and store them the first time it is correct */
  submitQuiz: SubmitQuizResponse;
  /** Add or update a chapter */
  upsertChapter: Chapter;
  /** Add or update a lesson */
  upsertLesson: Lesson;
};


export type MutationLoginUserArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationRefreshTokenArgs = {
  token: Scalars['String']['input'];
};


export type MutationRegisterUserArgs = {
  input: RegisterInput;
};


export type MutationSaveVideoProgressArgs = {
  chapterId: Scalars['String']['input'];
  watchedUntil: Scalars['Int']['input'];
};


export type MutationSubmitQuizArgs = {
  answers: Array<QuestionAnswerInput>;
  chapterId: Scalars['String']['input'];
};


export type MutationUpsertChapterArgs = {
  chapterId?: InputMaybe<Scalars['String']['input']>;
  input: ChapterInput;
  lessonId: Scalars['String']['input'];
  videoFile?: InputMaybe<Scalars['Upload']['input']>;
};


export type MutationUpsertLessonArgs = {
  input: LessonInput;
  lessonId?: InputMaybe<Scalars['String']['input']>;
  pictureFile?: InputMaybe<Scalars['Upload']['input']>;
};

export type Query = {
  __typename?: 'Query';
  /** Retrieves a lesson chapter by id */
  chapter?: Maybe<Chapter>;
  /** Retrieves a single lesson by id */
  lesson?: Maybe<Lesson>;
  /** Retrieves all lessons */
  lessons: Array<Lesson>;
  /** Retrieves all users */
  users: Array<User>;
};


export type QueryChapterArgs = {
  chapterId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryLessonArgs = {
  lessonId?: InputMaybe<Scalars['ID']['input']>;
};

export type Question = {
  __typename?: 'Question';
  answers: Array<Scalars['String']['output']>;
  correctAnswer: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  question: Scalars['String']['output'];
};

export type QuestionAnswerInput = {
  answer: Scalars['String']['input'];
  questionId: Scalars['String']['input'];
};

export type QuestionInput = {
  answers: Array<Scalars['String']['input']>;
  correctAnswer: Scalars['String']['input'];
  question: Scalars['String']['input'];
};

export type RegisterInput = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export enum Role {
  Admin = 'ADMIN',
  Member = 'MEMBER'
}

export type SubmitQuizResponse = {
  __typename?: 'SubmitQuizResponse';
  incorrectQuestionsId: Array<Scalars['String']['output']>;
  isValid: Scalars['Boolean']['output'];
};

export type Tokens = {
  __typename?: 'Tokens';
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  firstLogin: Scalars['DateTime']['output'];
  firstName: Scalars['String']['output'];
  fullName: Scalars['String']['output'];
  hashedPassword: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastLogin: Scalars['DateTime']['output'];
  lastName: Scalars['String']['output'];
  role: Role;
};

export type UserWithTokens = {
  __typename?: 'UserWithTokens';
  tokens: Tokens;
  user: User;
};

export type LoginUserMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginUserMutation = { __typename?: 'Mutation', loginUser: { __typename?: 'UserWithTokens', tokens: { __typename?: 'Tokens', accessToken: string, refreshToken: string }, user: { __typename?: 'User', fullName: string } } };

export type RegisterUserMutationVariables = Exact<{
  input: RegisterInput;
}>;


export type RegisterUserMutation = { __typename?: 'Mutation', registerUser: { __typename?: 'UserWithTokens', tokens: { __typename?: 'Tokens', accessToken: string, refreshToken: string }, user: { __typename?: 'User', fullName: string } } };

export type LessonsQueryVariables = Exact<{ [key: string]: never; }>;


export type LessonsQuery = { __typename?: 'Query', lessons: Array<{ __typename?: 'Lesson', id: string, description: string, markdownContent?: string | null, title: string, totalDuration: number, updatedAt?: Date | null, userProgress: number, chapters: Array<{ __typename?: 'Chapter', id: string, title: string }> }> };


export const LoginUserDocument = gql`
    mutation LoginUser($email: String!, $password: String!) {
  loginUser(email: $email, password: $password) {
    tokens {
      accessToken
      refreshToken
    }
    user {
      fullName
    }
  }
}
    `;
export type LoginUserMutationFn = Apollo.MutationFunction<LoginUserMutation, LoginUserMutationVariables>;

/**
 * __useLoginUserMutation__
 *
 * To run a mutation, you first call `useLoginUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginUserMutation, { data, loading, error }] = useLoginUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginUserMutation(baseOptions?: Apollo.MutationHookOptions<LoginUserMutation, LoginUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginUserMutation, LoginUserMutationVariables>(LoginUserDocument, options);
      }
export type LoginUserMutationHookResult = ReturnType<typeof useLoginUserMutation>;
export type LoginUserMutationResult = Apollo.MutationResult<LoginUserMutation>;
export type LoginUserMutationOptions = Apollo.BaseMutationOptions<LoginUserMutation, LoginUserMutationVariables>;
export const RegisterUserDocument = gql`
    mutation RegisterUser($input: RegisterInput!) {
  registerUser(input: $input) {
    tokens {
      accessToken
      refreshToken
    }
    user {
      fullName
    }
  }
}
    `;
export type RegisterUserMutationFn = Apollo.MutationFunction<RegisterUserMutation, RegisterUserMutationVariables>;

/**
 * __useRegisterUserMutation__
 *
 * To run a mutation, you first call `useRegisterUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerUserMutation, { data, loading, error }] = useRegisterUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRegisterUserMutation(baseOptions?: Apollo.MutationHookOptions<RegisterUserMutation, RegisterUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterUserMutation, RegisterUserMutationVariables>(RegisterUserDocument, options);
      }
export type RegisterUserMutationHookResult = ReturnType<typeof useRegisterUserMutation>;
export type RegisterUserMutationResult = Apollo.MutationResult<RegisterUserMutation>;
export type RegisterUserMutationOptions = Apollo.BaseMutationOptions<RegisterUserMutation, RegisterUserMutationVariables>;
export const LessonsDocument = gql`
    query Lessons {
  lessons {
    id
    description
    chapters {
      id
      title
    }
    markdownContent
    title
    totalDuration
    updatedAt
    userProgress
  }
}
    `;

/**
 * __useLessonsQuery__
 *
 * To run a query within a React component, call `useLessonsQuery` and pass it any options that fit your needs.
 * When your component renders, `useLessonsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLessonsQuery({
 *   variables: {
 *   },
 * });
 */
export function useLessonsQuery(baseOptions?: Apollo.QueryHookOptions<LessonsQuery, LessonsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LessonsQuery, LessonsQueryVariables>(LessonsDocument, options);
      }
export function useLessonsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LessonsQuery, LessonsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LessonsQuery, LessonsQueryVariables>(LessonsDocument, options);
        }
export function useLessonsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<LessonsQuery, LessonsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<LessonsQuery, LessonsQueryVariables>(LessonsDocument, options);
        }
export type LessonsQueryHookResult = ReturnType<typeof useLessonsQuery>;
export type LessonsLazyQueryHookResult = ReturnType<typeof useLessonsLazyQuery>;
export type LessonsSuspenseQueryHookResult = ReturnType<typeof useLessonsSuspenseQuery>;
export type LessonsQueryResult = Apollo.QueryResult<LessonsQuery, LessonsQueryVariables>;