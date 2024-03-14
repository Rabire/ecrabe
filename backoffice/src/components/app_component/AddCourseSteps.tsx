import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

const AddCourseSteps = () => {
  const [step, setStep] = useState(1);
  return (
    <div>
      {step === 1 && (
        <div>
          <h2>Choisissez le type de cours que vous souhaitez ajouter</h2>
          <div className="flex justify-between">
            <Card>
              <CardContent>
                <div className="flex flex-col">
                  <FileText />
                  <p>Un cours texte</p>
                </div>
                <CardFooter></CardFooter>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <FileText />
                <CardFooter>
                  <p>Un cours vidéo</p>
                </CardFooter>
              </CardContent>
            </Card>
          </div>
          <Button onClick={() => setStep(2)}>Suivant</Button>
        </div>
      )}
    </div>
  );
};

export default AddCourseSteps;
