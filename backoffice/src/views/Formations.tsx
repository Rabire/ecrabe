import MiniatureComponent from "@/components/app_component/MiniatureComponent";
import { Button } from "@/components/ui/button";
import { Lesson, useLessonsQuery } from "@/types/graphql-generated";

/* const formations = [
  {
    id: "1",
    title: "Formation 1",
    description: "description 1",
    image: "https://via.placeholder.com/150",
  },
  {
    id: "2",
    title: "Formation 2",
    description: "description 2",
    image: "https://via.placeholder.com/150",
  },
  {
    id: "3",
    title: "Formation 3",
    description: "description 3",
    image: "https://via.placeholder.com/150",
  },
  {
    id: "4",
    title: "Formation 4",
    description: "description 4",
    image: "https://via.placeholder.com/150",
  },
  {
    id: "5",
    title: "Formation 5",
    description: "description 5",
    image: "https://via.placeholder.com/150",
  },
  {
    id: "6",
    title: "Formation 6",
    description: "description 6",
    image: "https://via.placeholder.com/150",
  },
  {
    id: "7",
    title: "Formation 7",
    description: "description 7",
    image: "https://via.placeholder.com/150",
  },
  {
    id: "8",
    title: "Formation 8",
    description: "description 8",
    image: "https://via.placeholder.com/150",
  },
  {
    id: "9",
    title: "Formation 9",
    description: "description 9",
    image: "https://via.placeholder.com/150",
  },
  {
    id: "10",
    title: "Formation 10",
    description: "description 10",
    image: "https://via.placeholder.com/150",
  },
]; */

const Formations = () => {
  const { data, error, loading } = useLessonsQuery();

  console.log({ data, error, loading });

  return (
    <div className="w-4/5 p-4">
      <div className="title my-4">
        <h1 className="text-2xl font-bold text-black">Mes Formation</h1>
      </div>
      <div className="my-4">
        <Button className="w-1/4">Ajouter une formation</Button>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {data?.lessons.map((formation) => (
          <MiniatureComponent
            key={formation.id}
            formation={formation as Lesson}
          />
        ))}
      </div>
    </div>
  );
};

export default Formations;
