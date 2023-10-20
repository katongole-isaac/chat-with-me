/**
 * Contact top Header section 
 */

import { IoClose } from "react-icons/io5";


const TopHeader = ({ onClick }: any) => {
  return (
    <div className="py-3 border-b flex items-center gap-4 border-slate-300">
      <div className="text-slate-700 w-10 h-10 rounded-full p-1 flex items-center justify-center ">
        <IoClose onClick={() => onClick(false)} size={30} role="button" />
      </div>
      <div className="font-medium text-xl">
        <h1> Contact Info</h1>
      </div>
    </div>
  );
};


export default TopHeader;