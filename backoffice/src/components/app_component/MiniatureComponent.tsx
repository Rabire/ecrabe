import { Link } from "react-router-dom";
type MiniatureComponentProps = {
  formation: Formation;
};
type Formation = {
  id: string;
  title: string;
  description: string;
  image: string;
};
const MiniatureComponent = ({ formation }: MiniatureComponentProps) => {
  return (
    <Link to={"/formation/" + formation.id}>
      <div className="flex flex-col text-center rounded-xl p-2 border border-solid border-gray-200 transition delay-150 hover:scale-110 hover:bg-slate-200">
        <img src={formation.image} alt="miniature" className="rounded" />
        <h3 className="font-bold mt-2">{formation.title}</h3>
        <p>{formation.description}</p>
      </div>
    </Link>
  );
};

export default MiniatureComponent;
