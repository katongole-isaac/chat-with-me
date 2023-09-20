/**
 * Chating page
 *
 */
"use client";

import React, { startTransition, useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import withAuth from "@/lib/auth/withAuth";
import config from "@/config/defaults.json";
import { genUserId } from "@/helpers/genUserId";
import { getCurrentUser, logout } from "@/helpers/user";
import { firebaseAuth } from "@/lib/firebaseApp";
import authenicateUser from "@/lib/auth/authenicateUser";
import type { ChatMessage, LoggedInUser, MessageFormat } from "@/misc/types";

import Profile from "@/components/user/profile";
import ChatMenu from "@/components/chat/chatMenu";
import ChatDisplay from "@/components/chat/chatDisplay";
import MessageInput from "@/components/chat/messageInput";
import DefaultToaster from "@/components/toasts/toasterSetting";
import NotifyToast from "@/components/toasts/notify";
import useCheckBrowserConnectivity from "@/lib/checkConnectivity";
import LostConnectivity from "@/components/lostConnectivity";

export const UserContext = React.createContext<LoggedInUser | null>(null);

const Chat = () => {
  const [wss, setWss] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [showProfile, setShowProfile] = useState<boolean>(false);

  const chatRef = useRef<HTMLDivElement>(null);

  const user = getCurrentUser();

  const router = useRouter();

  useCheckBrowserConnectivity();

  // open event
  const handleWebsocketOnOpen = (ev: Event) => {
    console.log("Connected");

    const checkOnlineStatus: MessageFormat = {
      type: "login",
    };

    wss!.send(JSON.stringify(checkOnlineStatus));

    // wss.onmessage = function(ev) {
    //   console.log("Initally: ", JSON.stringify(ev.data));
    // }
  };

  // message event
  const handleWebsocketOnMessage = (ev: MessageEvent) => {
    wss!.onmessage = function (event) {
      console.log(event.data);
      setMessages((prev) => [...prev, event.data]);
    };
  };

  const handleWebsocketOnError = (ev: Event) => {};

  const handleSubmitMsg = (msg: string) => {
    console.log(msg);
    // setMessages((prev) => [...prev, msg]);
    if (wss) {
      wss.send(`{msg: null}`);
    }
  };

  const handleProfileClick = () => {
    startTransition(() => {
      setShowProfile((prev) => !prev);
    });
  };

  useEffect(() => {
    // getting the logged in user's token

    firebaseAuth.onAuthStateChanged(async (_user) => {
      try {
        setToken((await _user?.getIdToken(true)) as string);
      } catch (err) {
        // here something went wrong when fetching firebase user token
        toast.custom(
          <NotifyToast message="Failed to fetch user token" ErrorIcon />
        );
      }
    });
  }, []);

  useEffect(() => {
    // first authenticate on the server
    (async () => {
      if (token) {
        const res = await authenicateUser(token);

        // userId uniquely identifies user on the server
        const userId = genUserId() as string;

        // if valid token, go ahead
        // and create websocket connection
        if (res?.message === "ok")
          setWss(
            new WebSocket(`${config.websocketUrl}/?token=${token}`, ["json"])
          );

        // when the user token is invalid (wrong)
        // u need to logout the user
        if (res?.redirectUrl) {
          toast.custom(
            <NotifyToast
              message="Failed to authenticate request, Please try again"
              ErrorIcon
            />
          );

          setTimeout(async () => {
            await logout(firebaseAuth);
            router.replace("/login");
          }, 5000);
        }
      }
    })();
  }, [token]);

  useEffect(() => {
    if (wss) {
      wss.addEventListener("open", handleWebsocketOnOpen);
      wss.addEventListener("message", handleWebsocketOnMessage);
      wss.addEventListener("error", handleWebsocketOnError);

      // unsubcribe to events
      return () => {
        wss.removeEventListener("open", handleWebsocketOnOpen);
        wss.removeEventListener("message", handleWebsocketOnMessage);
        wss.removeEventListener("error", handleWebsocketOnError);
      };
    }
  }, [wss]);

  return (
    <UserContext.Provider value={{ user, wss }}>
      <div className="w-screen h-screen bg-zinc-200">
        <div className="py-8 w-full h-full ">
          <div className="max-w-[1200px] bg-zinc-100 h-full shadow-lg  m-auto border ">
            <div className="grid grid-cols-[1.5fr_3fr] h-full">
              {/* fist grid */}
              <div className="w-full h-full overflow-y-auto max-h-full  min-w-0 min-h-0 relative custom-scrollbar">
                {!showProfile && (
                  <ChatMenu onProfileClick={handleProfileClick} />
                )}

                {showProfile && (
                  <Profile onClose={setShowProfile} showProfile={showProfile} />
                )}
                <LostConnectivity />
              </div>

              {/* second grid */}
              <div className="border-l min-w-0 min-h-0 relative">
                <div className="h-full flex flex-col">
                  <div className="flex-1">
                    <div className="max-h-[810px] h-full min-h-[810px] relative custom-scrollbar overflow-y-auto ">
                      <ChatDisplay ref={chatRef} messages={messages} />
                    </div>
                  </div>
                  <div className="">
                    <MessageInput onSubmit={handleSubmitMsg} ref={chatRef} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DefaultToaster />
    </UserContext.Provider>
  );
};

export default withAuth(Chat);