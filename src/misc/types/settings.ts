/**
 * Setting component
 * 
 */

import React, { SetStateAction } from "react";
import { IModal } from "./modals";

// use for modals that appear in the settings panel
export type ISettingModalLabel = "keyboard_shortcuts" | "theme" | ""

export interface ISettingModal {
    label:  ISettingModalLabel;
    open:boolean;
}

export interface ISettings {
  onBackClick: any;
  onShowModals: React.Dispatch<SetStateAction<IModal>>;
  onClickSettingItem: Function;
}