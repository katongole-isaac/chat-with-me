import React from "react";

const Divider = ({ text }: { text: string }) => {
  return (
    <div className="relative flex items-center">
      <div className="flex-grow border-t border-gray-400 dark:border-neutral-700 "></div>
      <span className="flex-shrink mx-4 text-gray-400 "> {text} </span>
      <div className="flex-grow border-t border-gray-400  dark:border-neutral-700"></div>
    </div>
  );
};

export default Divider;
