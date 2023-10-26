/**
 * Search Box
 *
 */
import { useRef } from 'react'
import { BiSearchAlt2 } from "react-icons/bi";

export default function Search() {

    const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="w-full py-2 flex justify-center ">
      <div className="w-[90%] flex gap-2  items-center  px-3 bg-neutral-300 border rounded-full mt-1 ">
        <BiSearchAlt2
        onClick={ ()=> inputRef.current?.focus() }
        size={22} className="text-gray-500  cursor-pointer"  />
        <input
        ref={inputRef}
        type="search"
        placeholder="search..."
        className="bg-transparent p-1 flex-1 focus:outline-none text-gray-600" />
      </div>
    </div>
  );
}
