import { SetStateAction } from "react";

export interface IOption {
  title: string;
  id?:string;
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
