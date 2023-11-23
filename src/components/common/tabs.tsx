/**
 * Tabs
 *
 */

import { TabsProps, TabProps } from "@/misc/types";

export default function Tabs({ tabs, activeTab, setActiveTab, classes }: TabsProps) {
  return (
    <div className="w-full px-2 py-3 flex gap-3 border-b dark:border-[#343434]">
      {tabs.map((tab) => (
        <Tab
          key={tab.id}
          {...tab}
          activeTab={activeTab}
          onActiveTab={setActiveTab}
          classes={classes}
        />
      ))}
    </div>
  );
}

const Tab = ({ label, activeTab, onActiveTab, classes }: TabProps) => {


  const activeTabClasses =
    activeTab === label.toLowerCase().trim()
      ? "bg-neutral-300 dark:bg-neutral-700 dark:text-gray-100 text-slate-900 font-medium"
      : ` ${classes ??  'text-slate-600 dark:text-gray-300' }`;

  return (
    <div
      onClick={() => onActiveTab(label.toLowerCase().trim())}
      role="button"
      className={`p-1 px-2 text-[12px] rounded-sm ${[activeTabClasses, classes].join(' ')} `}
    >
      <span> {label} </span>
    </div>
  );
};
