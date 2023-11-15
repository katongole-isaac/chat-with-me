/**
 * Calls & logs compoent
 * 
 */

import React from 'react'
import CallListItem from './callListItem'
import { IoCall } from "react-icons/io5";
import { FaVideo } from "react-icons/fa";

const Calls = () => {

 const icons = [IoCall, FaVideo];
    
  return (
    <div className="px-3 py-4">
      <div className="flex flex-col gap-2 h-full divide-y dark:divide-[#343434] ">
        <CallListItem icons={icons} description="Hey, I'm using chat_with_me" />
      </div>
    </div>
  );
}

export default Calls

