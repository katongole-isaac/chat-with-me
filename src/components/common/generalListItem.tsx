/**
 * This is used to display menu individual item in component such as Settings
 */

import { GeneralListItemProps } from "@/misc/types/generalLayout";

const GeneralListItem = ({
  leftIcon,
  rightIcon,
  description,
  onClickRightIcon,
  onClick,
  hover = true,
  label,
  id,
}: GeneralListItemProps) => {
  const LIcon = leftIcon ?? undefined;
  const RIcon = rightIcon ?? undefined;
  const iconSize = 25;


  const renderDescription = () => {
    if (!description) return null;

    if (typeof description !== "string") {
      const Description = description;
      return <Description />;
    }

    return <p className="text-gray-500 text-[12px]">{description}</p>;
  };

  return (
    <div
      role="button"
      onClick={() => (onClick ? onClick(id!.toLowerCase().trim()) : null)}
      className={`w-full flex gap-2 items-center pt-5 pb-3 ${
        hover ? "hover:bg-neutral-200" : ""
      } `}
    >
      {/* left icon */}
      {LIcon && (
        <div className="basis-10 borders flex items-center justify-center">
          <LIcon size={iconSize} className="text-gray-500" />
        </div>
      )}

      {/* content */}
      <div className="flex-1 flex flex-col gap-[2px] borders">
        {label && <p className="font-medium text-gray-600 ">{label} </p>}
        {renderDescription()}
      </div>

      {/* right icon */}
      {RIcon && (
        <div className="basis-10 borders flex items-center justify-center">
          <RIcon
            size={iconSize}
            className="text-gray-500"
            onClick={() => (onClickRightIcon ? onClickRightIcon() : null)}
          />
        </div>
      )}
    </div>
  );
};

export default GeneralListItem;
