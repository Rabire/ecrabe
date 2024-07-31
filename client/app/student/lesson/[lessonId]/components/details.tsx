import MdRenderer from "@/components/md-renderer";
import { formatDate, formatSeconds } from "@/lib/format-utils";
import { LessonPageQuery } from "@/src/types/graphql-generated";
import { BookIcon, CalendarIcon, TimerIcon } from "lucide-react";

type Props = { lesson: LessonPageQuery["lesson"] };

const LessonDetail = ({ lesson }: Props) => (
  <div className="space-y-4">
    <h2>Détails</h2>

    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <CalendarIcon size={20} />
        <p>Mis à jour le {formatDate(lesson.updatedAt)}</p>
      </div>

      <div className="flex items-center gap-2">
        <BookIcon size={20} />
        <p>{lesson.chapters.length} chapitres</p>
      </div>

      <div className="flex items-center gap-2 pb-4">
        <TimerIcon size={20} />
        <p>Durée de {formatSeconds(lesson.totalDuration)}</p>
      </div>
    </div>

    <MdRenderer text={lesson.markdownContent} />

    <h2>Formateur</h2>
    <p>TODO: UserInfo</p>
    {/* <UserInfo user={lesson.teacher} /> */}
  </div>
);

export default LessonDetail;
