import React, { SetStateAction } from "react";

export interface TabProps {
  label: string;
  id: string | number;
  activeTab: string | number;
  onActiveTab: React.Dispatch<SetStateAction<string>>;
}

export interface ITab {
  id: number;
  label: string;
}

export interface TabsProps {
  tabs: ITab[];
  activeTab: string;
  setActiveTab: React.Dispatch<SetStateAction<string>>;
}
