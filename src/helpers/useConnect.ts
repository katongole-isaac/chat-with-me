/**
 * Used to connect to websocket
 *
 */
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import config from "@/config/defaults.json";
import authenicateUser from "@/lib/auth/authenicateUser";
import NotifyToast from "@/components/toasts/notify";
import { logout } from "./user";
import { firebaseAuth } from "@/lib/firebaseApp";

type ConnectParams = {
  token: string | null;
  wss: WebSocket | null;
  onWss: Function;
};

const useConnect = ({ token, wss, onWss }: ConnectParams) => {
  const router = useRouter();

  // connect func - is used in the onclose websocket handler
  // to reconnect to the server
  const connect = async () => {
    // if we have the token and the websocket is closed or null
    // try to connect
    if (
      !((wss === null || (wss && wss.readyState === WebSocket.CLOSED)) && token)
    )
      return;

    // first authenticate
    const res = await authenicateUser(token);

    if (res?.message === "ok")
      return onWss(
        new WebSocket(`${config.websocketUrl}/?token=${token}`, ["json"])
      );

    // when the user token is invalid (wrong)
    // u need to logout the user.
    if (res?.redirectUrl) {
      toast.custom(
        NotifyToast({
          message: "Authentication failed, Please try again",
          ErrorIcon: true,
        })
      );

      let timerId = setTimeout(async () => {
        await logout(firebaseAuth);

        router.replace("/login");

        clearTimeout(timerId);
      }, 1000);
    }
  };

  useEffect(() => {
    if (!wss) connect();
  }, [token, wss]);

  return { connect };
};

export default useConnect;

