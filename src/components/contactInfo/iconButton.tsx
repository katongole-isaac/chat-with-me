/**
 * Buttons used in the contact info section
 */

const IconButton = ({
  icon,
  label,
}: {
  icon: React.JSX.ElementType;
  label: string;
}) => {
  const Icon = icon;
  return (
    <div
      role="button"
      className="w-max px-5 py-2 flex justify-center gap-2 rounded-md text-[#dc3545] border border-[#dc3545] hover:bg-[#dc3545] hover:text-white"
    >
      <Icon className="" size={20} />
      <span className="font-medium"> {label} </span>
    </div>
  );
};


export default IconButton;