/**
 * Caret Icon - Its displayed when user hover on the message.
 *
 */

import { PiCaretDown } from "react-icons/pi";

import { OptionsIconProps } from "@/misc/types/popupOptions";

export const OptionsIcon = ({incoming, id , onShowOptions }: OptionsIconProps) => {

  const handleIconClick = (id: string | number) => {

    onShowOptions((prev) => {
      if (prev.id === id)
        return prev.isOpen
          ? { ...prev, isOpen: !prev.isOpen }
          : { id, isOpen: true };

      return { id, isOpen: true };
    });
    
  };

  return (
    <div
      className={`self-start hidden group-hover:flex absolute w-5 h-5  justify-center items-center right-0 top-0 ${
        incoming ? "text-gray-700 bg-gray-50" : "text-gray-700 bg-gray-50"
      } `}
      role="button"
      onClick={() => handleIconClick(id)}
    >
      <PiCaretDown size={15} />
    </div>
  );
};
