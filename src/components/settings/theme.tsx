/**
 * Theme modal
 *
 */

import React from "react";

import Backdrop from "../common/backdrop";
import { Theme } from "@/misc/types";
import RadioButton from "../common/radioButton";
import { useTheme } from "next-themes";

interface ThemeSwitchProps {
  onCancel: React.MouseEventHandler<HTMLButtonElement>;
}


const ThemeSwitch = ({ onCancel }: ThemeSwitchProps) => {

  const {theme, setTheme }= useTheme();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTheme(e.target.value as Theme);
  };

  const themeOptions = [
    {
      value: "light",
      label: "Light",
    },
    {
      value: "dark",
      label: "Dark",
    },
    {
      value: "system",
      label: "System Preference",
    },
  ];

  const handleApplyChanges = (e:React.MouseEvent<HTMLButtonElement>) => {
    // do something here  

    // close the modal
    onCancel(e);

  }

  return (
    <Backdrop>
      <div className="bg-[#fafafa] dark:bg-[#232323] py-5 px-8 min-w-[320px] max-w-[320px] m-auto rounded-md">
        {/* title */}
        <div>
          <h1 className="font-semibold text-lg text-gray-700 dark:text-gray-300"> Choose theme</h1>
        </div>

        <div className="flex flex-col gap-4 py-4">
          {themeOptions.map((_theme) => (
            <RadioButton
              key={_theme.value}
              {..._theme}
              activeValue={theme as string}
              onChange={handleOnChange}
            />
          ))}
        </div>

        {/* actions */}
        <div className="flex gap-4 py-2 justify-end font-medium text-[13px] [&>button]:font-medium ">
          <button
            className="text-sky-700 dark:text-gray-300 transition duration-300 hover:font-semibold "
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            onClick={handleApplyChanges}
            className="text-sky-700 dark:text-gray-300 transition duration-300 hover:font-semibold  "
          >
            Apply
          </button>
        </div>
      </div>
    </Backdrop>
  );
};

export default ThemeSwitch;


