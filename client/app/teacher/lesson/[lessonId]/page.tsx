"use client";

import IconBadge from "@/app/components/icon-badge";
import { LoadingWheel } from "@/components/loader";
import { useTeacherLessonsPageQuery } from "@/src/types/graphql-generated";
import { LayoutDashboard } from "lucide-react";
import CategoryForm from "./_components/categorie-form";
import DescriptionForm from "./_components/description-form";
import TitleForm from "./_components/title-form";

type Props = {
  params: {
    lessonId: string;
  };
};

const categories = [
  { id: "1", name: "Web Development" },
  { id: "2", name: "Mobile Development" },
  { id: "3", name: "Data Science" },
  { id: "4", name: "Machine Learning" },
  { id: "5", name: "Artificial Intelligence" },
  { id: "6", name: "Cyber Security" },
  { id: "7", name: "Cloud Computing" },
  { id: "8", name: "DevOps" },
  { id: "9", name: "Game Development" },
  { id: "10", name: "Software Engineering" },
  { id: "11", name: "Other" },
];

const Lessonpage = ({ params }: Props) => {
  const { lessonId } = params;

  const { data, loading, error } = useTeacherLessonsPageQuery({
    variables: { lessonId },
  });

  if (!data && !loading) return null;
  if (!data) return null;

  const requiredFields = [
    data?.lesson?.title,
    data?.lesson?.description,
    data?.lesson?.markdownContent,
    data?.lesson?.pictureUrl,
    data?.lesson?.totalDuration,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  return (
    <div className="p-6">
      {loading && (
        <div className="flex justify-center">
          <LoadingWheel />
        </div>
      )}
      {error && (
        <div className="error">
          Une erreur est survenue lors du chargement de la leçon.
        </div>
      )}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">Course Setup</h1>
          <span className="text-sm text-slate-700">
            Veuillez remplir tout les champs {completionText}
          </span>
        </div>
      </div>
      <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboard} />
            <h2 className="text-xl">Customise your course</h2>
          </div>
          <TitleForm title={data?.lesson.title || ""} lessonId={lessonId} />
          <DescriptionForm
            description={data?.lesson.description || ""}
            lessonId={lessonId}
          />
          <CategoryForm
            initialData={data?.lesson}
            lessonId={lessonId}
            options={categories.map((category) => ({
              label: category.name,
              value: category.id,
            }))}
          />
        </div>
      </div>
    </div>
  );
};

export default Lessonpage;
