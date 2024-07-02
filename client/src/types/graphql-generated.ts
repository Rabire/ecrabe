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

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', loginUser: { __typename?: 'UserWithTokens', tokens: { __typename?: 'Tokens', accessToken: string, refreshToken: string }, user: { __typename?: 'User', fullName: string } } };

export type RegisterMutationVariables = Exact<{
  input: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', registerUser: { __typename?: 'UserWithTokens', tokens: { __typename?: 'Tokens', accessToken: string, refreshToken: string }, user: { __typename?: 'User', fullName: string, id: string } } };

export type UpsertLessonMutationVariables = Exact<{
  input: LessonInput;
  pictureFile?: InputMaybe<Scalars['Upload']['input']>;
}>;


export type UpsertLessonMutation = { __typename?: 'Mutation', upsertLesson: { __typename?: 'Lesson', markdownContent?: string | null, title: string, description: string } };


export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
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
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($input: RegisterInput!) {
  registerUser(input: $input) {
    tokens {
      accessToken
      refreshToken
    }
    user {
      fullName
      id
    }
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const UpsertLessonDocument = gql`
    mutation UpsertLesson($input: LessonInput!, $pictureFile: Upload) {
  upsertLesson(input: $input, pictureFile: $pictureFile) {
    markdownContent
    title
    description
  }
}
    `;
export type UpsertLessonMutationFn = Apollo.MutationFunction<UpsertLessonMutation, UpsertLessonMutationVariables>;

/**
 * __useUpsertLessonMutation__
 *
 * To run a mutation, you first call `useUpsertLessonMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpsertLessonMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upsertLessonMutation, { data, loading, error }] = useUpsertLessonMutation({
 *   variables: {
 *      input: // value for 'input'
 *      pictureFile: // value for 'pictureFile'
 *   },
 * });
 */
export function useUpsertLessonMutation(baseOptions?: Apollo.MutationHookOptions<UpsertLessonMutation, UpsertLessonMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpsertLessonMutation, UpsertLessonMutationVariables>(UpsertLessonDocument, options);
      }
export type UpsertLessonMutationHookResult = ReturnType<typeof useUpsertLessonMutation>;
export type UpsertLessonMutationResult = Apollo.MutationResult<UpsertLessonMutation>;
export type UpsertLessonMutationOptions = Apollo.BaseMutationOptions<UpsertLessonMutation, UpsertLessonMutationVariables>;