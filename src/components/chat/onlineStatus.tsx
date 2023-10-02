/**
 * This shows whether the user
 * is either online or offline
 * 
 */

import { useContext, useEffect, useState } from "react";

import { UserContext } from "@/app/chat/page";
import { LoggedInUser } from "@/misc/types";
import useStatus from "@/helpers/useStatus";

const OnlineStatus = ({ size }: { size?: number }) => {
  const { online } = useStatus();
  
  return (
    <div
      className={` absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 p-1

    ${online ? "bg-green-600" : "bg-rose-500"}
    
    
`}
    ></div>
  );
};

export default OnlineStatus; 