/**
 * Checks and return the status of the user
 * [ online or offline ]
 *
 */

import { startTransition, useContext, useEffect, useState } from "react";

import { UserContext } from "@/app/chat/page";
import { LoggedInUser, MessageFormat } from "@/misc/types";
import { getStoredOnlineStatus, setStoredOnlineStatus } from "./user";

const useStatus = () => {
  const { wss } = useContext(UserContext) as LoggedInUser;

  const storedOnlineStatus = getStoredOnlineStatus();
  const [online, setOnline] = useState<boolean>(storedOnlineStatus || false);


  const handleOnMessage = (ev : MessageEvent)  => {

     const message = JSON.parse(ev.data) as MessageFormat;

        if (message.type === "login") {
          const status = message.params?.isOnline;

          if (status) {

            // store the status in localstorage
            setStoredOnlineStatus(status);

            // update status without blocking the UI
            startTransition(() => {
              setOnline(status);
            });
          }
        }

  }

  // when the websocket is closed
  const handleOnClose = (ev: CloseEvent ) => {

    // update online value in the localstorage
      setStoredOnlineStatus(false);

      // update the UI state
       startTransition(() => {

         setOnline( false );

       });
  }

  useEffect(() => {
    if (wss) {

        wss.addEventListener('message', handleOnMessage);
        wss.addEventListener("close", handleOnClose);

        return () => {

        wss.removeEventListener("message", handleOnMessage);
        wss.removeEventListener("close", handleOnClose);

        }
    }

  }, [wss, online]);

  return { online };
};

export default useStatus;
