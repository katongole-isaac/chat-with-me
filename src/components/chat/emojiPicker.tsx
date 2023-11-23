/**
 * Emoji Picker
 *
 */

import React from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { FaRegFaceSmile } from "react-icons/fa6";
import { useShowHideModal } from "@/hooks/useShowHideModal";

interface EmojiPickerProps {
  onEmojiSelect: React.Dispatch<(arg: string) => string | string>;
}

export default function EmojiPicker({ onEmojiSelect }: EmojiPickerProps) {
  const { showModal: showPicker, setShowModal: setShowPicker } =
    useShowHideModal();

  return (
    <div className="">
      <FaRegFaceSmile
        onClick={() => setShowPicker((prev) => !prev)}
        size={20}
        className="text-gray-400"
        role="button"
      />
      {showPicker && (
        <div className="absolute -top-[27em] right-12 z-10 w-max h-max">
          <Picker
            data={data}
            previewPosition="none"
            onEmojiSelect={(emoji: any) => onEmojiSelect((prev: string) => prev + emoji?.native) }
            theme="light"
            onClickOutside={() => setShowPicker((prev) => !prev)}
          />
        </div>
      )}
    </div>
  );
}

