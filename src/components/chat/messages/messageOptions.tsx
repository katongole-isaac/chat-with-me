/**
 * Menu Options modal layout component
 *
 */

import React, { useContext } from "react";

import { MessageOptionContext } from "../message";
import PopupOptions from "../../common/popupOptions";
import { MessageOptionsProps, IPopupOptionsContext } from "@/misc/types";

const MessageOptions = ({id, classes}: MessageOptionsProps) => {

  const { onShowPopUpOptions, showPopUpOptions } = useContext(MessageOptionContext) as IPopupOptionsContext;

  // message options
  const options = [
    { title: "Reply" },
    { title: "React" },
    { title: "Star" },
    { title: "Report" },
    { title: "Delete" },
  ];

  return (
    <React.Fragment>
      {showPopUpOptions.isOpen && id === (showPopUpOptions.id as number) && (
        <PopupOptions
          onShowPopup={onShowPopUpOptions}
          options={options}
          classes={classes}
        />
      )}
    </React.Fragment>
  );
};

export default MessageOptions;
