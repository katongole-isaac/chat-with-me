/**
 * Chip compoent
 *
 */

import { AiOutlineClose } from "react-icons/ai";

interface ChipProps {
  icon?: React.JSX.ElementType;
  id?: any;
  onCloseClick?: React.MouseEventHandler<HTMLElement>;
}

const Chip = ({ onCloseClick, icon, id }: ChipProps) => {
  const Icon = icon;

  return (
    <div className="self-start bg-gray-200 dark:bg-neutral-700 w-max rounded-full px-[3px] ">
      <div className="flex items-center gap-1 text-[12px]">
        {Icon && <Icon />}
        <span className=" text-gray-800 dark:text-gray-300"> Isaac Katongole </span>
        <div
          role="button"
          className=" hover:bg-slate-100 dark:hover:bg-neutral-500 w-4 h-4 flex items-center justify-center rounded-full"
        >
          <AiOutlineClose
            onClick={onCloseClick ? () => onCloseClick(id) : null}
            className="text-gray-600 dark:text-gray-300"
          />
        </div>
      </div>
    </div>
  );
};

export default Chip;
