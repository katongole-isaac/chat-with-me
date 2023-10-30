/**
 * General layout for Option uIs
 *
 */

import React from "react";
import { BiArrowBack } from "react-icons/bi";

import { GeneralLayoutProps } from "@/misc/types/generalLayout";

const GeneralLayout = ({
  children,
  onBackClick,
  title,
}: GeneralLayoutProps) => {
  return (
    <div className="w-full h-full">
      <div className="min-h-[10%] max-h-[11%] text-gray-800 dark:text-gray-300 px-4 transparent flex gap-3 items-center border-b dark:border-b-[#343434] ">
        <BiArrowBack
          size={25}
          onClick={() => (onBackClick ? onBackClick() : null)}
          role="button"
        />
        <h1 className="font-medium text-xl">{title}</h1>
      </div>
      <div className="w-full h-[calc(100%-10%)] px-4 py-2 overflow-y-auto custom-scrollbar">
        {children}
      </div>
    </div>
  );
};

export default GeneralLayout;
