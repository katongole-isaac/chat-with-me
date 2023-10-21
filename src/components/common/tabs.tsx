/**
 * Tabs
 *
 */

import { TabsProps, ITab, TabProps } from "@/misc/types/tabs";

export default function Tabs({ tabs, activeTab, setActiveTab }: TabsProps) {
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

const Tab = ({ label, activeTab, onActiveTab }: TabProps) => {


  const activeTabClasses =
    activeTab === label.toLowerCase().trim()
      ? "bg-neutral-300 text-slate-900 font-medium"
      : "text-slate-600";

  return (
    <div
      onClick={() => onActiveTab(label.toLowerCase().trim())}
      role="button"
      className={`p-1 px-2 text-[12px] rounded-sm ${activeTabClasses} `}
    >
      <span> {label} </span>
    </div>
  );
};
