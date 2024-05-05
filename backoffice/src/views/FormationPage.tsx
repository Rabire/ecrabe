import MiniCoursItem from "@/components/app_component/MiniCoursItem";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const FormationPage = () => {
  return (
    <div className="w-8/12 mx-auto overflow-y-auto h-[100vh]">
      <div className="my-4">
        <img
          src="https://images.unsplash.com/photo-1710092673366-68f0114d3db1?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="formation"
          className="w-full h-96 object-cover rounded-lg"
        />
      </div>
      <h1 className="font-bold text-2xl">Nom de la formation</h1>
      <p>description de la formation</p>
      <div className="mt-4">
        <h2 className="text-xl font-bold">Contenu de la formation</h2>
        <div>
          <Button>Ajouter un Chapitre</Button>
        </div>
        <div className="border border-solid border-gray-200 px-2 rounded-xl mt-4">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Chapitre 1</AccordionTrigger>
              <AccordionContent>
                <MiniCoursItem />

                <div className="my-4">
                  <Button>Ajouter un cours</Button>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Chapitre 2</AccordionTrigger>
              <AccordionContent>
                <MiniCoursItem />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Chapitre 3</AccordionTrigger>
              <AccordionContent>
                <MiniCoursItem />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default FormationPage;
