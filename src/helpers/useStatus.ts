/**
 * Checks and return the status of the user
 * [ online or offline ]
 *
 */

import { startTransition, useContext, useEffect, useState } from "react";

import { UserContext } from "@/app/chat/page";
import { LoggedInUser, MessageFormat } from "@/misc/types";
import { getStoredOnlineStatus, setStoredOnlineStatus } from "./user";
import useCheckBrowserConnectivity from "@/lib/checkConnectivity";

const useStatus = () => {
  const { wss } = useContext(UserContext) as LoggedInUser;

  const storedOnlineStatus = getStoredOnlineStatus();
  const [online, setOnline] = useState<boolean>(storedOnlineStatus || false);

  const { isBrowserConnected } = useCheckBrowserConnectivity();

  const handleOnMessage = (ev: MessageEvent) => {
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
  };

  // when the websocket is closed
  const handleOnClose = (ev: CloseEvent) => {
    // update online value in the localstorage
    setStoredOnlineStatus(false);

    // update the UI state
    startTransition(() => {
      setOnline(false);
    });
  };
  
  const updateOnlineState = (state: boolean) => {
    setOnline(state);
    setStoredOnlineStatus(state);
  };


  // update the online status accordingly
  // with the browser's connectivity
  useEffect(() => {

    if (isBrowserConnected) updateOnlineState(true);
    else updateOnlineState(false);

  }, [isBrowserConnected]);

  useEffect(() => {
    if (wss) {
      wss.addEventListener("message", handleOnMessage);
      wss.addEventListener("close", handleOnClose);

      return () => {
        wss.removeEventListener("message", handleOnMessage);
        wss.removeEventListener("close", handleOnClose);
      };
    } else {
      // if there is no wss
      // that means the user is offline
      if (online) updateOnlineState(false)
    }
  }, [wss, online]);

  return { online };
};

export default useStatus;
