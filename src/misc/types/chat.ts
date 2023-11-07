
/**
 * Types and interface related to chats
 * 
*/
import { IModal } from "./modals";

export interface ChatMenuProps {
  onProfileClick: Function;
  onOptionClick: Function;
  onShowModals: React.Dispatch<React.SetStateAction<IModal>>;
  onCallClick?: React.MouseEventHandler<HTMLElement>;
};

export interface ChatsProps extends ChatMenuProps {}