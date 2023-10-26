import { useContext } from "react";


import Avatar from "../user/avatar";
import { LoggedInUser } from "@/misc/types";
import { UserContext } from "@/app/chat/page";
import GeneralListItem from "../common/generalListItem";

interface CallListItemProps {
  description : React.JSX.ElementType | string;
  icons: Array<React.JSX.ElementType>
}

const CallListItem = ({description, icons }: CallListItemProps) => {
  const { user } = useContext(UserContext) as LoggedInUser;

  const { photoURL, displayName } = user?.providerData[0];

  const LeftIcon = () => (
    <Avatar
      displayName={displayName}
      photoURL={photoURL}
      imageClassName="max-w-[50px]"
    />
  );

//   used to display video or audio items
  const Icon = ({ icon }: { icon: React.JSX.ElementType }) => {
    const MyIcon = icon;

    return <MyIcon size={20} className="text-slate-900" role="button" onClick={ ()=> console.log('li')} />;
  };
  
  const RightIcon = () => (
    <div className="flex gap-4">
      {icons.map((icon, idx) => (
        <Icon key={idx} icon={icon} />
      ))}
    </div>
  );

  return (
    <GeneralListItem
      hover={false}
      label="Isaac Katongole"
      leftIcon={LeftIcon}
      rightIcon={RightIcon}
      description={description}
    />
  );
};

export default CallListItem;
