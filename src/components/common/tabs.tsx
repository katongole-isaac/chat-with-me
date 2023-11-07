/**
 * Tabs
 *
 */

import { TabsProps, TabProps } from "@/misc/types/tabs";

export default function Tabs({ tabs, activeTab, setActiveTab }: TabsProps) {
  return (
    <div className="w-full px-2 py-3 flex gap-3 border-b dark:border-[#343434]">
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
      ? "bg-neutral-300 dark:bg-neutral-700 dark:text-gray-100 text-slate-900 font-medium"
      : "text-slate-600 dark:text-gray-800 ";

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
