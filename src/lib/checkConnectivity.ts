/**
 * Checking whether the user is online
 * (whether Browser can access internet)
 * The network results are got from the service worker
 *
 */

import { useEffect, useState } from "react";

const useCheckBrowserConnectivity = () => {

  const [isBrowserConnected, setIsBrowserConnected] = useState(
    navigator.onLine
  );

  const handleServiceWorkerMessage =( ev:MessageEvent) => {

    const data = JSON.parse(ev.data);
  
    if (!data) return;
  
    const { type, params } = data;
  
    if (type !== "networkStatus") return;
  
    if (isBrowserConnected !== params.onLine)
      setIsBrowserConnected(params?.onLine);
  
  }

  useEffect(() => {
    navigator.serviceWorker.addEventListener('message', handleServiceWorkerMessage);

    return () => {
      navigator.serviceWorker.removeEventListener('message', handleServiceWorkerMessage )
    }
  }, [isBrowserConnected]);

  return { isBrowserConnected };
};

export default useCheckBrowserConnectivity;
