import { FileBadge, Settings, User, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
const Sidebar = () => {
  return (
    <div className="w-1/5 bg-white h-screen shadow-lg justify-between flex flex-col">
      <div>
        <div className="logo p-4 flex justify-center">
          <h3 className="font-bold uppercase text-xl">e-crabe</h3>
        </div>
        <nav className="p-4">
          <ul className="gap-4">
            <Link to={"/"}>
              <li>
                <Button variant={"outline"} className="w-full my-2 gap-2">
                  <Users />
                  Mes étudiants
                </Button>
              </li>
            </Link>
            <Link to={"/formations"}>
              <li>
                <Button variant={"outline"} className="w-full my-2 gap-2">
                  <FileBadge />
                  Mes Formations
                </Button>
              </li>
            </Link>
            <Link to={"/compte"}>
              <li>
                <Button variant={"outline"} className="w-full my-2 gap-2">
                  <User />
                  Mon Compte
                </Button>
              </li>
            </Link>
          </ul>
        </nav>
      </div>

      <div className="settings p-4 flex justify-center w-full">
        <Link to={"/parametres"} className="w-full">
          <ul>
            <li className="w-full">
              <Button className="w-full">
                <Settings />
                Paramètres
              </Button>
            </li>
          </ul>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
