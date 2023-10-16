/**
 * Tabs
 *
 */

import { useState } from "react";

type TabProps = {
  label: string;
  id: string | number;
  activeTab: string | number;
  onActiveTab: React.Dispatch<number | string>;
};

export default function Tabs() {
  const [activeTab, setActiveTab] = useState<string | number>(0);

  const tabs = [
    {
      id: 0,
      label: "All",
    },
    {
      id: 1,
      label: "People",
    },
    {
      id: 2,
      label: "Chats",
    },
    {
      id: 3,
      label: "Rooms",
    },
  ];

  return (
    <div className="w-full px-2 py-3 flex gap-3 border-b ">
      {tabs.map((tab) => (
        <Tab
          key={tab.id}
          {...tab}
          activeTab={activeTab}
          onActiveTab={setActiveTab}
        />
      ))}
    </div>
  );
}

const Tab = ({ label, activeTab, id, onActiveTab }: TabProps) => {
  const activeTabClasses =
    activeTab === id
      ? "bg-neutral-300 text-slate-900 font-medium"
      : "text-slate-600";

  return (
    <div
      onClick={() => onActiveTab(id)}
      role="button"
      className={`p-1 px-2 text-[12px] rounded-sm ${activeTabClasses} `}
    >
      <span> {label} </span>
    </div>
  );
};
