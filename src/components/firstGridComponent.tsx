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
import Chats from "./chat";
import Profile from "./user/profile";
import { IModal } from "@/misc/types/modals";
import { ChatsProps } from "@/misc/types/chat";
import { IShowComponent } from "@/misc/types/renderComponent";

interface FirstGridProps extends ChatsProps {
  onBackClick: any;
  onShowModals: React.Dispatch<React.SetStateAction<IModal>>;
  firstGridComponent: IShowComponent;
}

const FirstGridComponent = ({
  onOptionClick,
  onBackClick,
  onProfileClick,
  firstGridComponent,
  onShowModals,
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

    case "profile":
      return <></>;
    //  return <Profile onClose={setShowProfile} showProfile={showProfile} />;

    case "notifications":
      return <SettingNotifications onBackClick={onBackClick} />;

    case "privacy":
      return <Privacy onBackClick={onBackClick} />;

    case "help":
      return <Help onBackClick={onBackClick} />;

    case "request_info":
      return <RequestInfo onBackClick={onBackClick} />;

    default:
      return (
        <Chats onOptionClick={onOptionClick} onProfileClick={onProfileClick} />
      );
  }
};

export default FirstGridComponent;
