/**
 * App's types
 */

  import React, { SetStateAction } from "react";


// ====================
// Message
// ====================
export interface MessageOptionsProps {
  id: number;
  classes?: string;
}
export interface ChatMessage{
  from: string;
  to: string;
  message: string;
  sentAt: Date;
  seen?: Boolean;
};

// commands for the websocket
// defining command types.
// SAME AS THE BACKEND
export enum CommandTypes {
  LOGIN = "login",
  JOIN_ROOM = "join",
  LEAVE_ROOM = "leave",
  CREATE_ROOM = "create",
  ERROR_ROOM = "error",
  GET_ROOMS_INFO = "getRoomsInfo",
  SUCCESS_ROOM = "success",
}

// describes message format used
export interface MessageFormat {
  type: CommandTypes;
  params?: Record<string, any>;
}


// ====================
// User
// ====================
export interface LoggedInUser {
  user: {
    [index: string]: any;
  };
}

// ====================
// Websocket
// ====================
export type ReadyState = 0 | 1 | 2 | 3 ;
export interface IWebSocket {
  wss?: WebSocket | null;
  readyState : ReadyState
}


// ====================
// Modals 
// ====================
export type IModalLabel = "keyboard_shortcuts" | "theme" | "friends" | "";

export interface IModal {
  label: IModalLabel;
  open: boolean;
}

// ====================
// Chat 
// ====================
export interface ChatMenuProps {
  onProfileClick: Function;
  onOptionClick: Function;
  onShowModals: React.Dispatch<React.SetStateAction<IModal>>;
  onCallClick?: React.MouseEventHandler<HTMLElement>;
}

export interface ChatsProps extends ChatMenuProps {
  onShowChatPanel: React.Dispatch<boolean>;
}

// ====================
// General Layout
// ====================
export interface GeneralListItemProps {
  leftIcon?: React.JSX.ElementType;
  rightIcon?: React.JSX.ElementType;
  onClickRightIcon?: Function;
  onClick?: Function;
  hover?: boolean;
  description?: React.JSX.ElementType | string;
  label?: string;
  id?: string;
}

export interface GeneralLayoutProps {
  children?: React.ReactNode;
  onBackClick?: any;
  title: String;
}


// ====================
// Keyboard Shortcuts
// ====================
export interface IShortCut {
  label: string;
  keys: string[];
}


// ====================
// PopUp Options
// ====================
export interface IOption {
  title: string;
  id?: string;
  onClick?: Function;
}

export interface OptionsIconProps {
  incoming?: boolean;
  onShowOptions: React.Dispatch<SetStateAction<IPopupOptions>>;
  id: string | number;
}

export interface IPopupOptions {
  isOpen: boolean;
  id: string | number;
}

export interface PopupOptionsProps {
  classes?: string;
  options: IOption[];
  onShowPopup: React.Dispatch<SetStateAction<IPopupOptions>>;
}

export interface IPopupOptionsContext {
  showPopUpOptions: IPopupOptions;
  onShowPopUpOptions: React.Dispatch<SetStateAction<IPopupOptions>>;
}

// Interface used in toggling specific component to be rendered at a given time.
// ====================
// Render/Show Component 
// ====================
export interface IShowComponent {
  label: ShowComponentLabel;
  open: boolean;
  history: ShowComponentLabel[];
}

export type ShowComponentLabel =
  | ""
  | "profile"
  | "settings"
  | "notifications"
  | "privacy"
  | "security"
  | "help"
  | "request_info"
  | "group";


// use for modals that appear in the settings panel
// ====================
// Settings
// ====================
  export type ISettingModalLabel = "keyboard_shortcuts" | "theme" | "";

  export interface ISettingModal {
    label: ISettingModalLabel;
    open: boolean;
  }

  export interface ISettings {
    onBackClick: any;
    onShowModals: React.Dispatch<SetStateAction<IModal>>;
    onClickSettingItem: Function;
  }

// ====================
// Tabs
// ====================
  export interface TabProps {
    label: string;
    id: string | number;
    activeTab: string | number;
    classes?: string;
    onActiveTab: React.Dispatch<SetStateAction<string>>;
  }

  export interface ITab {
    id: number;
    label: string;
  }

  export interface TabsProps {
    tabs: ITab[];
    activeTab: string;
    classes?: string;
    setActiveTab: React.Dispatch<SetStateAction<string>>;
  }

// ====================
// THeme
// ====================
  export type Theme = "light" | "dark" | "system";