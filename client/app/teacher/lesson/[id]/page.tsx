"use client";

import UpsertLessonForm from "@/components/upsert-lesson-form";
import apolloClient from "@/lib/apollo-client";
import { ApolloProvider } from "@apollo/client";

const LessonInfo = () => (
  <ApolloProvider client={apolloClient}>
    <main>
      <UpsertLessonForm />
    </main>
  </ApolloProvider>
);

export default LessonInfo;
