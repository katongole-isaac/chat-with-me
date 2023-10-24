/**
 * Show (returns) a given modal when its active
 *
 */

import { IModal } from "@/misc/types/modals";
import { KeyboardShortcuts, ThemeSwitch } from "../settings";

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
    default:
      return null;
  }
};

export default RenderModals;
