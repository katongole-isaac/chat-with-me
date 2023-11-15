import Avatar from "../user/avatar";

interface Props {
  action: React.ReactNode;
}

const UserListItem = ({ action }: Props) => {

  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-3 items-center">
        <Avatar displayName={""} photoURL={""} />

        <span className="">Katongole Isaac</span>
      </div>

      {action}
    </div>
  );
};

export default UserListItem;
