import { FileUpload } from "graphql-upload/Upload.js";
import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from "graphql";
import {
  User as UserModel,
  Comment as CommentModel,
  Lesson as LessonModel,
  Chapter as ChapterModel,
  Question as QuestionModel,
  Purchase as PurchaseModel,
  Category as CategoryModel,
} from "@prisma/client";
import { GraphQLContext } from "../middleware/context";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTime: { input: Date; output: Date };
  Upload: { input: FileUpload; output: FileUpload };
};

export type Category = {
  __typename?: "Category";
  id: Scalars["ID"]["output"];
  lessons: Array<Lesson>;
  name?: Maybe<Scalars["String"]["output"]>;
};

export type Chapter = {
  __typename?: "Chapter";
  comments: Array<Comment>;
  createdAt: Scalars["DateTime"]["output"];
  hasQuestions: Scalars["Boolean"]["output"];
  id: Scalars["ID"]["output"];
  isFree: Scalars["Boolean"]["output"];
  isPublished: Scalars["Boolean"]["output"];
  isQuizCompletedByUser: Scalars["Boolean"]["output"];
  isVideoWatchedByUser: Scalars["Boolean"]["output"];
  lesson: Lesson;
  markdownContent?: Maybe<Scalars["String"]["output"]>;
  position: Scalars["Int"]["output"];
  questions: Array<Question>;
  title: Scalars["String"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
  /** Percentage of video watched by user */
  userVideoWatchProgress: Scalars["Int"]["output"];
  /** Duration of the video in seconds. */
  videoDuration?: Maybe<Scalars["Int"]["output"]>;
  videoUrl?: Maybe<Scalars["String"]["output"]>;
};

export type ChapterInput = {
  /** A description of the chapter content or presentation - in markdown format. */
  markdownContent?: InputMaybe<Scalars["String"]["input"]>;
  questions: Array<QuestionInput>;
  title: Scalars["String"]["input"];
  /** Duration of the video in seconds. */
  videoDuration: Scalars["Int"]["input"];
};

export type ChapterOrderInput = {
  chapterId: Scalars["String"]["input"];
  position: Scalars["Int"]["input"];
};

export type Comment = {
  __typename?: "Comment";
  author: User;
  content: Scalars["String"]["output"];
  createdAt: Scalars["DateTime"]["output"];
  deletedAt?: Maybe<Scalars["DateTime"]["output"]>;
  id: Scalars["ID"]["output"];
};

export type Lesson = {
  __typename?: "Lesson";
  category?: Maybe<Category>;
  chapters: Array<Chapter>;
  description?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  markdownContent?: Maybe<Scalars["String"]["output"]>;
  pictureUrl?: Maybe<Scalars["String"]["output"]>;
  purchases: Array<Purchase>;
  teacher: User;
  title: Scalars["String"]["output"];
  totalDuration: Scalars["Int"]["output"];
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
  userProgress: Scalars["Int"]["output"];
};

export type LessonInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  markdownContent?: InputMaybe<Scalars["String"]["input"]>;
  pictureFile?: InputMaybe<Scalars["Upload"]["input"]>;
  sortedChapterIds?: InputMaybe<Array<Scalars["String"]["input"]>>;
  title: Scalars["String"]["input"];
};

export type Mutation = {
  __typename?: "Mutation";
  /** Admin only - Create a category */
  createCategory: Category;
  createComment: Comment;
  /** Create a lesson */
  createLesson: Lesson;
  deleteComment: Comment;
  editComment: Comment;
  /** Login a user using email and password */
  loginUser: UserWithTokens;
  /** Update chapters position */
  orderChapters: Scalars["Boolean"]["output"];
  /** Use cookie to refresh the access token */
  refreshToken: Tokens;
  /** Create a user */
  registerUser: UserWithTokens;
  /** Upsert a user video watch progress */
  saveVideoProgress: Scalars["Boolean"]["output"];
  /** Check user responses and store them the first time it is correct */
  submitQuiz: SubmitQuizResponse;
  /** Update a lesson */
  updateLesson: Lesson;
  /** Add or update a chapter */
  upsertChapter: Chapter;
};

export type MutationCreateCategoryArgs = {
  name: Scalars["String"]["input"];
};

export type MutationCreateCommentArgs = {
  chapterId: Scalars["String"]["input"];
  content: Scalars["String"]["input"];
};

export type MutationCreateLessonArgs = {
  title: Scalars["String"]["input"];
};

export type MutationDeleteCommentArgs = {
  commentId: Scalars["String"]["input"];
};

export type MutationEditCommentArgs = {
  commentId: Scalars["String"]["input"];
  content: Scalars["String"]["input"];
};

export type MutationLoginUserArgs = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type MutationOrderChaptersArgs = {
  chaptersOrder: Array<ChapterOrderInput>;
  lessonId: Scalars["String"]["input"];
};

export type MutationRegisterUserArgs = {
  input: RegisterInput;
};

export type MutationSaveVideoProgressArgs = {
  chapterId: Scalars["String"]["input"];
  watchedUntil: Scalars["Int"]["input"];
};

export type MutationSubmitQuizArgs = {
  answers: Array<QuestionAnswerInput>;
  chapterId: Scalars["String"]["input"];
};

export type MutationUpdateLessonArgs = {
  input: LessonInput;
  lessonId: Scalars["String"]["input"];
};

export type MutationUpsertChapterArgs = {
  chapterId?: InputMaybe<Scalars["String"]["input"]>;
  input: ChapterInput;
  lessonId: Scalars["String"]["input"];
  videoFile?: InputMaybe<Scalars["Upload"]["input"]>;
};

export type Purchase = {
  __typename?: "Purchase";
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["ID"]["output"];
  lesson: Lesson;
  lessonId: Scalars["String"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
  user: User;
  userId: Scalars["String"]["output"];
};

export type Query = {
  __typename?: "Query";
  /** Retrieves all lessons */
  browseLessons: Array<Lesson>;
  /** Retrieves all categories */
  categories: Array<Category>;
  /** Retrieves a lesson chapter by String */
  chapter: Chapter;
  /** Retrieves a lesson by id */
  lesson: Lesson;
  /** Retrieves a single user by id, if no id is provided, it will return the current user */
  user: User;
  /** Retrieves all users */
  users: Array<User>;
};

export type QueryBrowseLessonsArgs = {
  category?: InputMaybe<Scalars["String"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryChapterArgs = {
  chapterId: Scalars["String"]["input"];
};

export type QueryLessonArgs = {
  lessonId: Scalars["String"]["input"];
};

export type QueryUserArgs = {
  userId?: InputMaybe<Scalars["String"]["input"]>;
};

export type Question = {
  __typename?: "Question";
  answers: Array<Scalars["String"]["output"]>;
  correctAnswer: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  question: Scalars["String"]["output"];
};

export type QuestionAnswerInput = {
  answer: Scalars["String"]["input"];
  questionId: Scalars["String"]["input"];
};

export type QuestionInput = {
  answers: Array<Scalars["String"]["input"]>;
  correctAnswer: Scalars["String"]["input"];
  question: Scalars["String"]["input"];
};

export type RegisterInput = {
  email: Scalars["String"]["input"];
  firstName: Scalars["String"]["input"];
  lastName: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export enum Role {
  Admin = "ADMIN",
  Student = "STUDENT",
  Teacher = "TEACHER",
}

export type SubmitQuizResponse = {
  __typename?: "SubmitQuizResponse";
  incorrectQuestionsId: Array<Scalars["String"]["output"]>;
  isValid: Scalars["Boolean"]["output"];
};

export type Tokens = {
  __typename?: "Tokens";
  accessToken: Scalars["String"]["output"];
  refreshToken: Scalars["String"]["output"];
};

export type User = {
  __typename?: "User";
  comments: Array<Comment>;
  createdLessons: Array<Lesson>;
  email: Scalars["String"]["output"];
  firstLogin: Scalars["DateTime"]["output"];
  firstName: Scalars["String"]["output"];
  fullName: Scalars["String"]["output"];
  hashedPassword: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  lastLogin: Scalars["DateTime"]["output"];
  lastName: Scalars["String"]["output"];
  purchases: Array<Purchase>;
  role: Role;
};

export type UserWithTokens = {
  __typename?: "UserWithTokens";
  tokens: Tokens;
  user: User;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {},
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo,
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {},
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]["output"]>;
  Category: ResolverTypeWrapper<CategoryModel>;
  Chapter: ResolverTypeWrapper<ChapterModel>;
  ChapterInput: ChapterInput;
  ChapterOrderInput: ChapterOrderInput;
  Comment: ResolverTypeWrapper<CommentModel>;
  DateTime: ResolverTypeWrapper<Scalars["DateTime"]["output"]>;
  ID: ResolverTypeWrapper<Scalars["ID"]["output"]>;
  Int: ResolverTypeWrapper<Scalars["Int"]["output"]>;
  Lesson: ResolverTypeWrapper<LessonModel>;
  LessonInput: LessonInput;
  Mutation: ResolverTypeWrapper<{}>;
  Purchase: ResolverTypeWrapper<PurchaseModel>;
  Query: ResolverTypeWrapper<{}>;
  Question: ResolverTypeWrapper<QuestionModel>;
  QuestionAnswerInput: QuestionAnswerInput;
  QuestionInput: QuestionInput;
  RegisterInput: RegisterInput;
  Role: Role;
  String: ResolverTypeWrapper<Scalars["String"]["output"]>;
  SubmitQuizResponse: ResolverTypeWrapper<SubmitQuizResponse>;
  Tokens: ResolverTypeWrapper<Tokens>;
  Upload: ResolverTypeWrapper<Scalars["Upload"]["output"]>;
  User: ResolverTypeWrapper<UserModel>;
  UserWithTokens: ResolverTypeWrapper<
    Omit<UserWithTokens, "user"> & { user: ResolversTypes["User"] }
  >;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars["Boolean"]["output"];
  Category: CategoryModel;
  Chapter: ChapterModel;
  ChapterInput: ChapterInput;
  ChapterOrderInput: ChapterOrderInput;
  Comment: CommentModel;
  DateTime: Scalars["DateTime"]["output"];
  ID: Scalars["ID"]["output"];
  Int: Scalars["Int"]["output"];
  Lesson: LessonModel;
  LessonInput: LessonInput;
  Mutation: {};
  Purchase: PurchaseModel;
  Query: {};
  Question: QuestionModel;
  QuestionAnswerInput: QuestionAnswerInput;
  QuestionInput: QuestionInput;
  RegisterInput: RegisterInput;
  String: Scalars["String"]["output"];
  SubmitQuizResponse: SubmitQuizResponse;
  Tokens: Tokens;
  Upload: Scalars["Upload"]["output"];
  User: UserModel;
  UserWithTokens: Omit<UserWithTokens, "user"> & {
    user: ResolversParentTypes["User"];
  };
}>;

export type CategoryResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes["Category"] = ResolversParentTypes["Category"],
> = ResolversObject<{
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  lessons?: Resolver<Array<ResolversTypes["Lesson"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ChapterResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes["Chapter"] = ResolversParentTypes["Chapter"],
> = ResolversObject<{
  comments?: Resolver<
    Array<ResolversTypes["Comment"]>,
    ParentType,
    ContextType
  >;
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  hasQuestions?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  isFree?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  isPublished?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  isQuizCompletedByUser?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType
  >;
  isVideoWatchedByUser?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType
  >;
  lesson?: Resolver<ResolversTypes["Lesson"], ParentType, ContextType>;
  markdownContent?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  position?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  questions?: Resolver<
    Array<ResolversTypes["Question"]>,
    ParentType,
    ContextType
  >;
  title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  userVideoWatchProgress?: Resolver<
    ResolversTypes["Int"],
    ParentType,
    ContextType
  >;
  videoDuration?: Resolver<
    Maybe<ResolversTypes["Int"]>,
    ParentType,
    ContextType
  >;
  videoUrl?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CommentResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes["Comment"] = ResolversParentTypes["Comment"],
> = ResolversObject<{
  author?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  content?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  deletedAt?: Resolver<
    Maybe<ResolversTypes["DateTime"]>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateTimeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["DateTime"], any> {
  name: "DateTime";
}

export type LessonResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes["Lesson"] = ResolversParentTypes["Lesson"],
> = ResolversObject<{
  category?: Resolver<
    Maybe<ResolversTypes["Category"]>,
    ParentType,
    ContextType
  >;
  chapters?: Resolver<
    Array<ResolversTypes["Chapter"]>,
    ParentType,
    ContextType
  >;
  description?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  markdownContent?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  pictureUrl?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  purchases?: Resolver<
    Array<ResolversTypes["Purchase"]>,
    ParentType,
    ContextType
  >;
  teacher?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  totalDuration?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  updatedAt?: Resolver<
    Maybe<ResolversTypes["DateTime"]>,
    ParentType,
    ContextType
  >;
  userProgress?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"],
> = ResolversObject<{
  createCategory?: Resolver<
    ResolversTypes["Category"],
    ParentType,
    ContextType,
    RequireFields<MutationCreateCategoryArgs, "name">
  >;
  createComment?: Resolver<
    ResolversTypes["Comment"],
    ParentType,
    ContextType,
    RequireFields<MutationCreateCommentArgs, "chapterId" | "content">
  >;
  createLesson?: Resolver<
    ResolversTypes["Lesson"],
    ParentType,
    ContextType,
    RequireFields<MutationCreateLessonArgs, "title">
  >;
  deleteComment?: Resolver<
    ResolversTypes["Comment"],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteCommentArgs, "commentId">
  >;
  editComment?: Resolver<
    ResolversTypes["Comment"],
    ParentType,
    ContextType,
    RequireFields<MutationEditCommentArgs, "commentId" | "content">
  >;
  loginUser?: Resolver<
    ResolversTypes["UserWithTokens"],
    ParentType,
    ContextType,
    RequireFields<MutationLoginUserArgs, "email" | "password">
  >;
  orderChapters?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType,
    RequireFields<MutationOrderChaptersArgs, "chaptersOrder" | "lessonId">
  >;
  refreshToken?: Resolver<ResolversTypes["Tokens"], ParentType, ContextType>;
  registerUser?: Resolver<
    ResolversTypes["UserWithTokens"],
    ParentType,
    ContextType,
    RequireFields<MutationRegisterUserArgs, "input">
  >;
  saveVideoProgress?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType,
    RequireFields<MutationSaveVideoProgressArgs, "chapterId" | "watchedUntil">
  >;
  submitQuiz?: Resolver<
    ResolversTypes["SubmitQuizResponse"],
    ParentType,
    ContextType,
    RequireFields<MutationSubmitQuizArgs, "answers" | "chapterId">
  >;
  updateLesson?: Resolver<
    ResolversTypes["Lesson"],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateLessonArgs, "input" | "lessonId">
  >;
  upsertChapter?: Resolver<
    ResolversTypes["Chapter"],
    ParentType,
    ContextType,
    RequireFields<MutationUpsertChapterArgs, "input" | "lessonId">
  >;
}>;

export type PurchaseResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes["Purchase"] = ResolversParentTypes["Purchase"],
> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  lesson?: Resolver<ResolversTypes["Lesson"], ParentType, ContextType>;
  lessonId?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  user?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes["Query"] = ResolversParentTypes["Query"],
> = ResolversObject<{
  browseLessons?: Resolver<
    Array<ResolversTypes["Lesson"]>,
    ParentType,
    ContextType,
    Partial<QueryBrowseLessonsArgs>
  >;
  categories?: Resolver<
    Array<ResolversTypes["Category"]>,
    ParentType,
    ContextType
  >;
  chapter?: Resolver<
    ResolversTypes["Chapter"],
    ParentType,
    ContextType,
    RequireFields<QueryChapterArgs, "chapterId">
  >;
  lesson?: Resolver<
    ResolversTypes["Lesson"],
    ParentType,
    ContextType,
    RequireFields<QueryLessonArgs, "lessonId">
  >;
  user?: Resolver<
    ResolversTypes["User"],
    ParentType,
    ContextType,
    Partial<QueryUserArgs>
  >;
  users?: Resolver<Array<ResolversTypes["User"]>, ParentType, ContextType>;
}>;

export type QuestionResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes["Question"] = ResolversParentTypes["Question"],
> = ResolversObject<{
  answers?: Resolver<Array<ResolversTypes["String"]>, ParentType, ContextType>;
  correctAnswer?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  question?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SubmitQuizResponseResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes["SubmitQuizResponse"] = ResolversParentTypes["SubmitQuizResponse"],
> = ResolversObject<{
  incorrectQuestionsId?: Resolver<
    Array<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  isValid?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TokensResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes["Tokens"] = ResolversParentTypes["Tokens"],
> = ResolversObject<{
  accessToken?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  refreshToken?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface UploadScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Upload"], any> {
  name: "Upload";
}

export type UserResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes["User"] = ResolversParentTypes["User"],
> = ResolversObject<{
  comments?: Resolver<
    Array<ResolversTypes["Comment"]>,
    ParentType,
    ContextType
  >;
  createdLessons?: Resolver<
    Array<ResolversTypes["Lesson"]>,
    ParentType,
    ContextType
  >;
  email?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  firstLogin?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  fullName?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  hashedPassword?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  lastLogin?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  purchases?: Resolver<
    Array<ResolversTypes["Purchase"]>,
    ParentType,
    ContextType
  >;
  role?: Resolver<ResolversTypes["Role"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserWithTokensResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes["UserWithTokens"] = ResolversParentTypes["UserWithTokens"],
> = ResolversObject<{
  tokens?: Resolver<ResolversTypes["Tokens"], ParentType, ContextType>;
  user?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = GraphQLContext> = ResolversObject<{
  Category?: CategoryResolvers<ContextType>;
  Chapter?: ChapterResolvers<ContextType>;
  Comment?: CommentResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Lesson?: LessonResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Purchase?: PurchaseResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Question?: QuestionResolvers<ContextType>;
  SubmitQuizResponse?: SubmitQuizResponseResolvers<ContextType>;
  Tokens?: TokensResolvers<ContextType>;
  Upload?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
  UserWithTokens?: UserWithTokensResolvers<ContextType>;
}>;
