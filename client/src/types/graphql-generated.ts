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
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  /** A description of the lesson content or presentation - in markdown format. */
  markdownContent?: Maybe<Scalars['String']['output']>;
  /** The URL of the cover picture of the lesson. */
  pictureUrl?: Maybe<Scalars['String']['output']>;
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
  description?: InputMaybe<Scalars['String']['input']>;
  /** A description of the lesson content or presentation - in markdown format. */
  markdownContent?: InputMaybe<Scalars['String']['input']>;
  /** The file of the cover picture of the lesson. */
  pictureFile?: InputMaybe<Scalars['Upload']['input']>;
  sortedChapterIds?: InputMaybe<Array<Scalars['String']['input']>>;
  title: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Create a lesson */
  createLesson: Lesson;
  loginUser: UserWithTokens;
  refreshToken: Tokens;
  registerUser: UserWithTokens;
  /** Upsert a user video watch progress */
  saveVideoProgress: Scalars['Boolean']['output'];
  /** Check user responses and store them the first time it is correct */
  submitQuiz: SubmitQuizResponse;
  /** Update a lesson */
  updateLesson: Lesson;
  /** Add or update a chapter */
  upsertChapter: Chapter;
};


export type MutationCreateLessonArgs = {
  title: Scalars['String']['input'];
};


export type MutationLoginUserArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
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


export type MutationUpdateLessonArgs = {
  input: LessonInput;
  lessonId: Scalars['String']['input'];
};


export type MutationUpsertChapterArgs = {
  chapterId?: InputMaybe<Scalars['String']['input']>;
  input: ChapterInput;
  lessonId: Scalars['String']['input'];
  videoFile?: InputMaybe<Scalars['Upload']['input']>;
};

export type Query = {
  __typename?: 'Query';
  /** Retrieves a lesson chapter by String */
  chapter: Chapter;
  /** Retrieves a lesson by id */
  lesson: Lesson;
  /** Retrieves all lessons */
  lessons: Array<Lesson>;
  /** Retrieves a single user by id, if no id is provided, it will return the current user */
  user: User;
  /** Retrieves all users */
  users: Array<User>;
};


export type QueryChapterArgs = {
  chapterId: Scalars['String']['input'];
};


export type QueryLessonArgs = {
  lessonId: Scalars['String']['input'];
};


export type QueryUserArgs = {
  userId?: InputMaybe<Scalars['String']['input']>;
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
  Student = 'STUDENT',
  Teacher = 'TEACHER'
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
  lessons: Array<Lesson>;
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


export type LoginMutation = { __typename?: 'Mutation', loginUser: { __typename?: 'UserWithTokens', tokens: { __typename?: 'Tokens', accessToken: string, refreshToken: string }, user: { __typename?: 'User', role: Role } } };

export type RegisterMutationVariables = Exact<{
  input: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', registerUser: { __typename?: 'UserWithTokens', tokens: { __typename?: 'Tokens', accessToken: string, refreshToken: string }, user: { __typename?: 'User', role: Role } } };

export type SaveVideoProgressMutationVariables = Exact<{
  chapterId: Scalars['String']['input'];
  watchedUntil: Scalars['Int']['input'];
}>;


export type SaveVideoProgressMutation = { __typename?: 'Mutation', saveVideoProgress: boolean };

export type SubmitQuizMutationVariables = Exact<{
  chapterId: Scalars['String']['input'];
  answers: Array<QuestionAnswerInput> | QuestionAnswerInput;
}>;


export type SubmitQuizMutation = { __typename?: 'Mutation', submitQuiz: { __typename?: 'SubmitQuizResponse', isValid: boolean, incorrectQuestionsId: Array<string> } };

export type ChapterPageQueryVariables = Exact<{
  chapterId: Scalars['String']['input'];
}>;


export type ChapterPageQuery = { __typename?: 'Query', chapter: { __typename?: 'Chapter', id: string, title: string, markdownContent?: string | null, updatedAt: Date, videoUrl: string, videoDuration: number, isQuizCompletedByUser: boolean, isVideoWatchedByUser: boolean, userVideoWatchProgress: number, hasQuestions: boolean, lesson: { __typename?: 'Lesson', id: string, title: string, pictureUrl?: string | null, chapters: Array<{ __typename?: 'Chapter', id: string, title: string, isVideoWatchedByUser: boolean, isQuizCompletedByUser: boolean, hasQuestions: boolean }> }, questions: Array<{ __typename?: 'Question', id: string, question: string, answers: Array<string> }>, comments: Array<{ __typename?: 'Comment', id: string, content: string, createdAt: Date, deletedAt?: Date | null, author: { __typename?: 'User', id: string, firstName: string, lastName: string, fullName: string } }> } };

export type LessonPageQueryVariables = Exact<{
  lessonId: Scalars['String']['input'];
}>;


export type LessonPageQuery = { __typename?: 'Query', lesson: { __typename?: 'Lesson', id: string, title: string, description?: string | null, pictureUrl?: string | null, markdownContent?: string | null, totalDuration: number, userProgress: number, updatedAt?: Date | null, teacher: { __typename?: 'User', id: string, firstName: string, lastName: string, fullName: string }, chapters: Array<{ __typename?: 'Chapter', id: string, order: number, title: string, isQuizCompletedByUser: boolean, isVideoWatchedByUser: boolean, hasQuestions: boolean }> } };

export type UpsertChapterMutationVariables = Exact<{
  lessonId: Scalars['String']['input'];
  input: ChapterInput;
  videoFile?: InputMaybe<Scalars['Upload']['input']>;
}>;


export type UpsertChapterMutation = { __typename?: 'Mutation', upsertChapter: { __typename?: 'Chapter', id: string } };

export type CreateLessonMutationVariables = Exact<{
  title: Scalars['String']['input'];
}>;


export type CreateLessonMutation = { __typename?: 'Mutation', createLesson: { __typename?: 'Lesson', id: string, title: string } };

export type UpdateLessonMutationVariables = Exact<{
  lessonId: Scalars['String']['input'];
  input: LessonInput;
}>;


export type UpdateLessonMutation = { __typename?: 'Mutation', updateLesson: { __typename?: 'Lesson', id: string } };

export type TeacherLessonsPageQueryVariables = Exact<{
  lessonId: Scalars['String']['input'];
}>;


export type TeacherLessonsPageQuery = { __typename?: 'Query', lesson: { __typename?: 'Lesson', description?: string | null, id: string, markdownContent?: string | null, pictureUrl?: string | null, title: string, totalDuration: number, updatedAt?: Date | null, userProgress: number, chapters: Array<{ __typename?: 'Chapter', id: string, order: number, title: string, markdownContent?: string | null, updatedAt: Date, videoUrl: string, videoDuration: number, isQuizCompletedByUser: boolean, isVideoWatchedByUser: boolean, userVideoWatchProgress: number, hasQuestions: boolean, questions: Array<{ __typename?: 'Question', id: string, question: string, answers: Array<string>, correctAnswer: string }>, comments: Array<{ __typename?: 'Comment', id: string, content: string, createdAt: Date, deletedAt?: Date | null, author: { __typename?: 'User', fullName: string, id: string } }> }> } };

export type TeacherHomePageQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['String']['input']>;
}>;


export type TeacherHomePageQuery = { __typename?: 'Query', user: { __typename?: 'User', lessons: Array<{ __typename?: 'Lesson', markdownContent?: string | null, id: string, description?: string | null, pictureUrl?: string | null, title: string, totalDuration: number, updatedAt?: Date | null }> } };


export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  loginUser(email: $email, password: $password) {
    tokens {
      accessToken
      refreshToken
    }
    user {
      role
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
      role
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
export const SaveVideoProgressDocument = gql`
    mutation SaveVideoProgress($chapterId: String!, $watchedUntil: Int!) {
  saveVideoProgress(chapterId: $chapterId, watchedUntil: $watchedUntil)
}
    `;
export type SaveVideoProgressMutationFn = Apollo.MutationFunction<SaveVideoProgressMutation, SaveVideoProgressMutationVariables>;

/**
 * __useSaveVideoProgressMutation__
 *
 * To run a mutation, you first call `useSaveVideoProgressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveVideoProgressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveVideoProgressMutation, { data, loading, error }] = useSaveVideoProgressMutation({
 *   variables: {
 *      chapterId: // value for 'chapterId'
 *      watchedUntil: // value for 'watchedUntil'
 *   },
 * });
 */
export function useSaveVideoProgressMutation(baseOptions?: Apollo.MutationHookOptions<SaveVideoProgressMutation, SaveVideoProgressMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SaveVideoProgressMutation, SaveVideoProgressMutationVariables>(SaveVideoProgressDocument, options);
      }
export type SaveVideoProgressMutationHookResult = ReturnType<typeof useSaveVideoProgressMutation>;
export type SaveVideoProgressMutationResult = Apollo.MutationResult<SaveVideoProgressMutation>;
export type SaveVideoProgressMutationOptions = Apollo.BaseMutationOptions<SaveVideoProgressMutation, SaveVideoProgressMutationVariables>;
export const SubmitQuizDocument = gql`
    mutation SubmitQuiz($chapterId: String!, $answers: [QuestionAnswerInput!]!) {
  submitQuiz(chapterId: $chapterId, answers: $answers) {
    isValid
    incorrectQuestionsId
  }
}
    `;
export type SubmitQuizMutationFn = Apollo.MutationFunction<SubmitQuizMutation, SubmitQuizMutationVariables>;

/**
 * __useSubmitQuizMutation__
 *
 * To run a mutation, you first call `useSubmitQuizMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubmitQuizMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [submitQuizMutation, { data, loading, error }] = useSubmitQuizMutation({
 *   variables: {
 *      chapterId: // value for 'chapterId'
 *      answers: // value for 'answers'
 *   },
 * });
 */
export function useSubmitQuizMutation(baseOptions?: Apollo.MutationHookOptions<SubmitQuizMutation, SubmitQuizMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SubmitQuizMutation, SubmitQuizMutationVariables>(SubmitQuizDocument, options);
      }
export type SubmitQuizMutationHookResult = ReturnType<typeof useSubmitQuizMutation>;
export type SubmitQuizMutationResult = Apollo.MutationResult<SubmitQuizMutation>;
export type SubmitQuizMutationOptions = Apollo.BaseMutationOptions<SubmitQuizMutation, SubmitQuizMutationVariables>;
export const ChapterPageDocument = gql`
    query ChapterPage($chapterId: String!) {
  chapter(chapterId: $chapterId) {
    id
    title
    markdownContent
    updatedAt
    videoUrl
    videoDuration
    isQuizCompletedByUser
    isVideoWatchedByUser
    userVideoWatchProgress
    hasQuestions
    lesson {
      id
      title
      pictureUrl
      chapters {
        id
        title
        isVideoWatchedByUser
        isQuizCompletedByUser
        hasQuestions
      }
    }
    questions {
      id
      question
      answers
    }
    comments {
      id
      content
      createdAt
      deletedAt
      author {
        id
        firstName
        lastName
        fullName
      }
    }
  }
}
    `;

/**
 * __useChapterPageQuery__
 *
 * To run a query within a React component, call `useChapterPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useChapterPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChapterPageQuery({
 *   variables: {
 *      chapterId: // value for 'chapterId'
 *   },
 * });
 */
export function useChapterPageQuery(baseOptions: Apollo.QueryHookOptions<ChapterPageQuery, ChapterPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ChapterPageQuery, ChapterPageQueryVariables>(ChapterPageDocument, options);
      }
export function useChapterPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChapterPageQuery, ChapterPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ChapterPageQuery, ChapterPageQueryVariables>(ChapterPageDocument, options);
        }
export type ChapterPageQueryHookResult = ReturnType<typeof useChapterPageQuery>;
export type ChapterPageLazyQueryHookResult = ReturnType<typeof useChapterPageLazyQuery>;
export type ChapterPageQueryResult = Apollo.QueryResult<ChapterPageQuery, ChapterPageQueryVariables>;
export const LessonPageDocument = gql`
    query LessonPage($lessonId: String!) {
  lesson(lessonId: $lessonId) {
    id
    title
    description
    pictureUrl
    markdownContent
    totalDuration
    userProgress
    updatedAt
    teacher {
      id
      firstName
      lastName
      fullName
    }
    chapters {
      id
      order
      title
      isQuizCompletedByUser
      isVideoWatchedByUser
      hasQuestions
    }
  }
}
    `;

/**
 * __useLessonPageQuery__
 *
 * To run a query within a React component, call `useLessonPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useLessonPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLessonPageQuery({
 *   variables: {
 *      lessonId: // value for 'lessonId'
 *   },
 * });
 */
export function useLessonPageQuery(baseOptions: Apollo.QueryHookOptions<LessonPageQuery, LessonPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LessonPageQuery, LessonPageQueryVariables>(LessonPageDocument, options);
      }
export function useLessonPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LessonPageQuery, LessonPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LessonPageQuery, LessonPageQueryVariables>(LessonPageDocument, options);
        }
export type LessonPageQueryHookResult = ReturnType<typeof useLessonPageQuery>;
export type LessonPageLazyQueryHookResult = ReturnType<typeof useLessonPageLazyQuery>;
export type LessonPageQueryResult = Apollo.QueryResult<LessonPageQuery, LessonPageQueryVariables>;
export const UpsertChapterDocument = gql`
    mutation UpsertChapter($lessonId: String!, $input: ChapterInput!, $videoFile: Upload) {
  upsertChapter(lessonId: $lessonId, input: $input, videoFile: $videoFile) {
    id
  }
}
    `;
export type UpsertChapterMutationFn = Apollo.MutationFunction<UpsertChapterMutation, UpsertChapterMutationVariables>;

/**
 * __useUpsertChapterMutation__
 *
 * To run a mutation, you first call `useUpsertChapterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpsertChapterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upsertChapterMutation, { data, loading, error }] = useUpsertChapterMutation({
 *   variables: {
 *      lessonId: // value for 'lessonId'
 *      input: // value for 'input'
 *      videoFile: // value for 'videoFile'
 *   },
 * });
 */
export function useUpsertChapterMutation(baseOptions?: Apollo.MutationHookOptions<UpsertChapterMutation, UpsertChapterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpsertChapterMutation, UpsertChapterMutationVariables>(UpsertChapterDocument, options);
      }
export type UpsertChapterMutationHookResult = ReturnType<typeof useUpsertChapterMutation>;
export type UpsertChapterMutationResult = Apollo.MutationResult<UpsertChapterMutation>;
export type UpsertChapterMutationOptions = Apollo.BaseMutationOptions<UpsertChapterMutation, UpsertChapterMutationVariables>;
export const CreateLessonDocument = gql`
    mutation CreateLesson($title: String!) {
  createLesson(title: $title) {
    id
    title
  }
}
    `;
export type CreateLessonMutationFn = Apollo.MutationFunction<CreateLessonMutation, CreateLessonMutationVariables>;

/**
 * __useCreateLessonMutation__
 *
 * To run a mutation, you first call `useCreateLessonMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLessonMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLessonMutation, { data, loading, error }] = useCreateLessonMutation({
 *   variables: {
 *      title: // value for 'title'
 *   },
 * });
 */
export function useCreateLessonMutation(baseOptions?: Apollo.MutationHookOptions<CreateLessonMutation, CreateLessonMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateLessonMutation, CreateLessonMutationVariables>(CreateLessonDocument, options);
      }
export type CreateLessonMutationHookResult = ReturnType<typeof useCreateLessonMutation>;
export type CreateLessonMutationResult = Apollo.MutationResult<CreateLessonMutation>;
export type CreateLessonMutationOptions = Apollo.BaseMutationOptions<CreateLessonMutation, CreateLessonMutationVariables>;
export const UpdateLessonDocument = gql`
    mutation UpdateLesson($lessonId: String!, $input: LessonInput!) {
  updateLesson(lessonId: $lessonId, input: $input) {
    id
  }
}
    `;
export type UpdateLessonMutationFn = Apollo.MutationFunction<UpdateLessonMutation, UpdateLessonMutationVariables>;

/**
 * __useUpdateLessonMutation__
 *
 * To run a mutation, you first call `useUpdateLessonMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateLessonMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateLessonMutation, { data, loading, error }] = useUpdateLessonMutation({
 *   variables: {
 *      lessonId: // value for 'lessonId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateLessonMutation(baseOptions?: Apollo.MutationHookOptions<UpdateLessonMutation, UpdateLessonMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateLessonMutation, UpdateLessonMutationVariables>(UpdateLessonDocument, options);
      }
export type UpdateLessonMutationHookResult = ReturnType<typeof useUpdateLessonMutation>;
export type UpdateLessonMutationResult = Apollo.MutationResult<UpdateLessonMutation>;
export type UpdateLessonMutationOptions = Apollo.BaseMutationOptions<UpdateLessonMutation, UpdateLessonMutationVariables>;
export const TeacherLessonsPageDocument = gql`
    query TeacherLessonsPage($lessonId: String!) {
  lesson(lessonId: $lessonId) {
    chapters {
      id
      order
      title
      markdownContent
      updatedAt
      videoUrl
      videoDuration
      isQuizCompletedByUser
      isVideoWatchedByUser
      userVideoWatchProgress
      hasQuestions
      questions {
        id
        question
        answers
        correctAnswer
      }
      comments {
        id
        content
        createdAt
        deletedAt
        author {
          fullName
          id
        }
      }
    }
    description
    id
    markdownContent
    pictureUrl
    title
    totalDuration
    updatedAt
    userProgress
  }
}
    `;

/**
 * __useTeacherLessonsPageQuery__
 *
 * To run a query within a React component, call `useTeacherLessonsPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useTeacherLessonsPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTeacherLessonsPageQuery({
 *   variables: {
 *      lessonId: // value for 'lessonId'
 *   },
 * });
 */
export function useTeacherLessonsPageQuery(baseOptions: Apollo.QueryHookOptions<TeacherLessonsPageQuery, TeacherLessonsPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TeacherLessonsPageQuery, TeacherLessonsPageQueryVariables>(TeacherLessonsPageDocument, options);
      }
export function useTeacherLessonsPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TeacherLessonsPageQuery, TeacherLessonsPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TeacherLessonsPageQuery, TeacherLessonsPageQueryVariables>(TeacherLessonsPageDocument, options);
        }
export type TeacherLessonsPageQueryHookResult = ReturnType<typeof useTeacherLessonsPageQuery>;
export type TeacherLessonsPageLazyQueryHookResult = ReturnType<typeof useTeacherLessonsPageLazyQuery>;
export type TeacherLessonsPageQueryResult = Apollo.QueryResult<TeacherLessonsPageQuery, TeacherLessonsPageQueryVariables>;
export const TeacherHomePageDocument = gql`
    query TeacherHomePage($userId: String) {
  user(userId: $userId) {
    lessons {
      markdownContent
      id
      description
      pictureUrl
      title
      totalDuration
      updatedAt
    }
  }
}
    `;

/**
 * __useTeacherHomePageQuery__
 *
 * To run a query within a React component, call `useTeacherHomePageQuery` and pass it any options that fit your needs.
 * When your component renders, `useTeacherHomePageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTeacherHomePageQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useTeacherHomePageQuery(baseOptions?: Apollo.QueryHookOptions<TeacherHomePageQuery, TeacherHomePageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TeacherHomePageQuery, TeacherHomePageQueryVariables>(TeacherHomePageDocument, options);
      }
export function useTeacherHomePageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TeacherHomePageQuery, TeacherHomePageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TeacherHomePageQuery, TeacherHomePageQueryVariables>(TeacherHomePageDocument, options);
        }
export type TeacherHomePageQueryHookResult = ReturnType<typeof useTeacherHomePageQuery>;
export type TeacherHomePageLazyQueryHookResult = ReturnType<typeof useTeacherHomePageLazyQuery>;
export type TeacherHomePageQueryResult = Apollo.QueryResult<TeacherHomePageQuery, TeacherHomePageQueryVariables>;