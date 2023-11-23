/**
 * This is used to display menu individual item in component such as Settings
 */

import { GeneralListItemProps } from "@/misc/types";

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

    return (
      <p className="text-gray-500 dark:text-gray-400 text-[12px]">
        {description}
      </p>
    );
  };

  return (
    <div
      role="button"
      onClick={() => (onClick ? onClick(id!.toLowerCase().trim()) : null)}
      className={`w-full flex gap-2 items-center pt-5 pb-3 ${
        hover ? "hover:bg-neutral-200 dark:hover:bg-[#52525241] " : ""
      } `}
    >
      {/* left icon */}
      {LIcon && (
        <div className="basis-10  flex items-center justify-center">
          <LIcon
            size={iconSize}
            className="text-gray-500 dark:text-[#fafafac7]"
          />
        </div>
      )}

      {/* content */}
      <div className="flex-1 flex flex-col gap-[2px] ">
        {label && (
          <p className="font-medium text-gray-600 dark:text-gray-300 ">
            {label}
          </p>
        )}
        {renderDescription()}
      </div>

      {/* right icon */}
      {RIcon && (
        <div className="basis-10 flex items-center justify-center">
          <RIcon
            size={iconSize}
            className="text-gray-500 dark:text-gray-300"
            onClick={() => (onClickRightIcon ? onClickRightIcon() : null)}
          />
        </div>
      )}
    </div>
  );
};

export default GeneralListItem;
