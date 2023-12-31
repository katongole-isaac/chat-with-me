/**
 * This render a component in the first grid panel
 *
 */

import React from "react";

import Settings, {
  Help,
  Privacy,
  RequestInfo,
  Security,
  SettingNotifications,
} from "./settings";
import Group from "./groups";
import Chats from "./chat";
import Profile from "./user/profile";
import { IShowComponent, ChatsProps, IModal } from "@/misc/types";

interface FirstGridProps extends ChatsProps {
  onBackClick: any;
  onShowModals: React.Dispatch<React.SetStateAction<IModal>>;
  firstGridComponent: IShowComponent;
  onShowChatPanel: React.Dispatch<boolean>
}

const FirstGridComponent = ({
  onOptionClick,
  onBackClick,
  onProfileClick,
  firstGridComponent,
  onShowModals,
  onShowChatPanel
}: FirstGridProps) => {
  switch (firstGridComponent.label.toLowerCase().trim()) {
    case "settings":
      return (
        <Settings
          onBackClick={onBackClick}
          onClickSettingItem={onOptionClick}
          onShowModals={onShowModals}
        />
      );

    case "security":
      return <Security onBackClick={onBackClick} />;

    case "group":
      return <Group onBackClick={onBackClick} />;

    case "notifications":
      return <SettingNotifications onBackClick={onBackClick} />;

    case "privacy":
      return <Privacy onBackClick={onBackClick} />;

    case "profile":
      return <Profile onBackClick={onBackClick} />;

    case "help":
      return <Help onBackClick={onBackClick} />;

    case "request_info":
      return <RequestInfo onBackClick={onBackClick} />;

    default:
      return (
        <Chats
          onOptionClick={onOptionClick}
          onProfileClick={onProfileClick}
          onShowModals={onShowModals}
          onShowChatPanel={onShowChatPanel}
        />
      );
  }
};

export default FirstGridComponent;
