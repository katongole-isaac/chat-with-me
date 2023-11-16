/**
 * Show (returns) a given modal when its active
 *
 */

import { IModal } from "@/misc/types";
import { KeyboardShortcuts, ThemeSwitch } from "../settings";
import FriendExplore from "../friends";

interface RenderModalsProps {
  modal: IModal;
  onClose: React.MouseEventHandler<HTMLButtonElement>;
}

const RenderModals = ({ modal, onClose }: RenderModalsProps) => {
  switch (modal.label) {
    case "keyboard_shortcuts":
      return <KeyboardShortcuts onClickOk={onClose} />;
    case "theme":
      return <ThemeSwitch onCancel={onClose} />;

    case "friends": 
      return <FriendExplore onClose={onClose} />;
    default:
      return null;
  }
};

export default RenderModals;
