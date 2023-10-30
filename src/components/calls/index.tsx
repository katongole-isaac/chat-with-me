/**
 * Calls & logs compoent
 * 
 */

import React from 'react'
import CallListItem from './callListItem'
import { MdOutlineCall } from "react-icons/md";
import { VscDeviceCameraVideo } from "react-icons/vsc";

const Calls = () => {

 const icons = [MdOutlineCall, VscDeviceCameraVideo]
    
  return (
    <div className="px-3 py-4">
      <div className="flex flex-col gap-2 h-full divide-y dark:divide-[#343434] ">
        <CallListItem icons={icons} description="Hey, I'm using chat_with_me" />
      </div>
    </div>
  );
}

export default Calls

