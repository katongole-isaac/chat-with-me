/**
 * Types and interface related to chats
 * 
 */
export interface ChatMenuProps  {
  onProfileClick: Function;
  onOptionClick: Function;
  onCallClick?: React.MouseEventHandler<HTMLElement>
};

export interface ChatsProps extends ChatMenuProps {}