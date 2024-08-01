"use client";

import { useChapterQuery } from "@/src/types/graphql-generated";
import EditChapterForm from "./edit-chapter-form";

const Page = ({ params }: { params: { id: string; chapterId: string } }) => {
  const { chapterId } = params;

  const { data } = useChapterQuery({ variables: { chapterId } });
  if (!data) return null;
  // console.log(id)
  return (
    <div>
      <EditChapterForm chapterData={data} />
    </div>
  );
};

export default Page;
