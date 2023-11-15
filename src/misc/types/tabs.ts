import React, { SetStateAction } from "react";

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
  classes?:string;
  setActiveTab: React.Dispatch<SetStateAction<string>>;
}
