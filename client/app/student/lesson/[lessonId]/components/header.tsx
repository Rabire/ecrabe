import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LessonPageQuery } from "@/src/types/graphql-generated";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

type Props = { lesson: LessonPageQuery["lesson"] };

const LessonHeader = ({ lesson }: Props) => (
  <Card>
    <CardContent className="mx-auto grid max-w-7xl grid-cols-1 gap-4 p-4 md:grid-cols-2">
      <img
        src={lesson.pictureUrl || undefined}
        alt="Couverture de la leçon"
        className="max-h-52 rounded-lg md:order-last md:h-auto"
      />

      <CardHeader className="space-y-4">
        <CardTitle>{lesson.title}</CardTitle>
        <CardDescription>{lesson.description}</CardDescription>

        <Button asChild>
          <Link href="/#" className="mr-auto">
            <span>
              Commencer
              {/* TODO: "reprendre" si débuté */}
            </span>
            <ArrowRight size={20} />
          </Link>
        </Button>
      </CardHeader>
    </CardContent>
  </Card>
);

export default LessonHeader;
