"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GraphQLUpload_js_1 = __importDefault(require("graphql-upload/GraphQLUpload.js"));
const mutations_1 = __importDefault(require("./mutations"));
const queries_1 = __importDefault(require("./queries"));
const types_1 = __importDefault(require("./types"));
const resolvers = Object.assign({ Upload: GraphQLUpload_js_1.default, Query: queries_1.default, Mutation: mutations_1.default }, types_1.default);
exports.default = resolvers;
