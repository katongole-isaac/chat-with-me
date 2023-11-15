
/**
 * Types and interface related to chats
 * 
*/
import React from "react";
import { IModal } from "./modals";

export interface ChatMenuProps {
  onProfileClick: Function;
  onOptionClick: Function;
  onShowModals: React.Dispatch<React.SetStateAction<IModal>>;
  onCallClick?: React.MouseEventHandler<HTMLElement>;
};

export interface ChatsProps extends ChatMenuProps {
  onShowChatPanel: React.Dispatch<boolean>

}