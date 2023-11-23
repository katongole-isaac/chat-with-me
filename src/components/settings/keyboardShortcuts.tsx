/**
 * Keyboard ShortCuts modal
 *
 */

import React from "react";

import Backdrop from "../common/backdrop";
import keyboardShortcuts from "@/data/keyboardShortcuts";
import { IShortCut } from "@/misc/types";

interface KeyboardShortcutsProps {
  onClickOk: React.MouseEventHandler<HTMLButtonElement>;
}

const KeyboardShortcuts = ({ onClickOk }: KeyboardShortcutsProps) => {
  
  return (
    <Backdrop>
      <div className="bg-[#fafafa] dark:bg-[#232323] w-full max-w-[900px] m-auto max-h-max px-8 py-8 rounded-md">
        {/* title */}
        <div className="pb-6">
          <h1 className="font-medium text-xl text-gray-900 dark:text-gray-300">
            Keyboard Shortcuts
          </h1>
        </div>

        {/* shortcut list */}
        <div className="grid grid-cols-2 gap-7 ">
          {keyboardShortcuts.map((shrt) => (
            <ShortCut key={shrt.label} {...shrt} />
          ))}
        </div>

        {/* action */}
        <div className="flex w-full justify-end py-4 mt-3 ">
          <button
            onClick={onClickOk!}
            className="bg-sky-700 dark:bg-neutral-700 rounded-md px-6 py-1 text-slate-100 font-medium text-[14px] hover:bg-sky-800 "
          >
            OK
          </button>
        </div>
      </div>
    </Backdrop>
  );
};

export default KeyboardShortcuts;

const ShortCut = ({ label, keys }: IShortCut) => {
  return (
    <div className="flex gap-6 justify-between text-[14px]">
      <div className="">
        <p className="font-semibold text-zinc-600 dark:text-gray-300 dark-gray-300"> {label} </p>
      </div>

      <div className="flex gap-3">
        {keys.map((key) => (
          <div
            key={key}
            className="border bg-gray-200 dark:bg-neutral-700 dark:text-gray-100 dark:border-neutral-700 text-gray-700 font-medium font-mono px-2 "
          >
            <span>{key} </span>
          </div>
        ))}
      </div>
    </div>
  );
};
