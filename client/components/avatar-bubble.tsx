import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/src/types/graphql-generated";

type Props = {
  user: Pick<User, "firstName" | "lastName">; // TODO: picture url
};

const AvatarBubble = ({ user }: Props) => (
  <Avatar>
    <AvatarImage
      src="https://github.com/shadcn.png" // TODO: picture url
    />
    <AvatarFallback>
      {user.firstName[0]}
      {user.lastName[0]}
    </AvatarFallback>
  </Avatar>
);

export default AvatarBubble;
