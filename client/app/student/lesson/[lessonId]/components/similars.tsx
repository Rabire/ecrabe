import { Lesson } from "@/src/types/graphql-generated";

type Props = { lessons: Lesson[] };

const SimilarLessons = ({ lessons }: Props) => {
  if (lessons.length === 0) return null;

  return (
    <div className="space-y-4">
      <h2>Formations similaires</h2>

      {/* <CardsCarousel
    //   TODO: create carousel
    items={lesson.similarLessons.map((item) => (
      <LessonCard key={item.id} lesson={item} />
    ))}
    itemClassName="basis-full sm:basis-1/2 xl:basis-1/3"
  /> */}
    </div>
  );
};

export default SimilarLessons;
