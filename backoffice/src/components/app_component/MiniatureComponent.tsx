import { Lesson } from "@/types/graphql-generated";
import { Link } from "react-router-dom";

type Props = {
  formation: Pick<Lesson, "id" | "title" | "description" | "pictureUrl">;
};

const MiniatureComponent = ({ formation }: Props) => (
  <Link to={"/formation/" + formation.id}>
    <div className="flex gap-4 text-center rounded-xl p-2 border border-solid border-gray-200 transition delay-150 hover:scale-110 hover:bg-slate-200">
      <div className="h-[200px] bg-slate-300 rounded">
        <img src={formation.pictureUrl} alt="miniature" />
      </div>
      <div>
        <h3 className="font-bold mt-2">{formation.title}</h3>
        <p>{formation.description}</p>
      </div>
    </div>
  </Link>
);

export default MiniatureComponent;
