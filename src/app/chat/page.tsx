/**
 * Chating page
 *
 */
"use client";

import React, { useRef, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import "react-tooltip/dist/react-tooltip.css";

import DefaultChat from "./defaultChat";
import withAuth from "@/lib/auth/withAuth";
import useConnect from "@/hooks/useConnect";
import RenderModals from "@/components/modals";
import { getCurrentUser } from "@/helpers/user";
import NotifyToast from "@/components/toasts/notify";
import ChatTopBar from "@/components/chat/chatTopBar";
import MessageInput from "@/components/chat/messageInput";
import Conversation from "@/components/chat/conversation";
import ContactInfo from "@/components/contactInfo/contact";
import registerServiceWorker from "@/registerServiceWorker";
import DefaultToaster from "@/components/toasts/toasterSetting";
import InfinityToast from "@/components/toasts/reconnectToast";
import FirstGridComponent from "@/components/firstGridComponent";
import {
  IShowComponent,
  ShowComponentLabel,
  IModal,
  IWebSocket,
  ChatMessage,
  LoggedInUser,
  MessageFormat,
  ReadyState,
} from "@/misc/types";

registerServiceWorker();

export const UserContext = React.createContext<LoggedInUser | null>(null);
export const WebSocketContext = React.createContext<IWebSocket | null >(null);

const Chat = () => {
  const [wss, setWss] = useState<WebSocket | null>(null);
  const [readyState, setReadyState ] = useState<ReadyState>(0);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [reconnecting, setReconnecting] = useState<boolean>(false);
  const [reconnectToastId, setReconnectToastId] = useState<string>("");
  const [showContactDialog, setShowContactDialog] = useState(false);
  const [activeTab, setActiveTab] = useState("media");
  const [showChatPanel, setShowChatPanel] = useState(false);
  const [modal, setModal] = useState<IModal>({ label: "", open: false });
  const [firstGridComponent, setFirstGridComponent] = useState<IShowComponent>({
    label: "",
    open: false,
    history: [""],
  });

  const user = getCurrentUser();
  
  const chatRef = useRef<HTMLDivElement>(null);

  const { connect } = useConnect({ onWss: setWss, wss });

  // used to go back
  const handleBackClick = () => {
    setFirstGridComponent((prev) => {
      const history = [...prev.history];
      history.pop();

      return { ...prev, history, label: history[history.length - 1] };
    });
  };

  const handleOptionClick = (label: ShowComponentLabel) => {
    if (!label) return;

    setFirstGridComponent((prev) => ({
      history: [...prev.history, label],
      label,
      open: true,
    }));
  };

  const handleProfileClick = () => {
    setFirstGridComponent((prev) => ({
      history: [...prev.history, "profile"],
      label: "profile",
      open: true,
    }));
  };

  const handleCloseModal = () =>
    setModal((prev) => ({ label: "", open: false }));

  // open event
  const handleWebsocketOnOpen = (ev: Event) => {
    console.log("connected, status: ", wss?.readyState);

    setReconnecting(false);
    setReadyState(wss?.readyState as ReadyState);
    toast.dismiss(reconnectToastId);
  };

  // message event
  const handleWebsocketOnMessage = (ev: MessageEvent) => {
    const data = JSON.parse(ev.data) as MessageFormat;

    setMessages((prev) => [...prev, ev.data]);
  };

  const handleWebsocketOnError = (ev: Event) => {
    console.log("websocket error");
  };

  const handleSubmitMsg = (msg: string) => {
    console.log(msg);
    // setMessages((prev) => [...prev, msg]);
    if (wss) {
      wss.send(`{msg: null}`);
    }
  };

  const handleWebsocketOnClose = (ev: CloseEvent) => {
    console.log("socket closed: ", reconnecting);

    setReadyState(wss?.readyState as ReadyState);
    setReconnecting(true);
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Escape") setShowChatPanel(false);
  };

  useEffect(() => {
    let id: NodeJS.Timeout;

    if (reconnecting && wss) {
      id = setInterval(() => {
        connect(); // reconnect;
      }, 3000);
    }

    return () => clearInterval(id);
  }, [wss, reconnecting]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    if (wss) {
      wss.addEventListener("open", handleWebsocketOnOpen);
      wss.addEventListener("message", handleWebsocketOnMessage);
      wss.addEventListener("error", handleWebsocketOnError);
      wss.addEventListener("close", handleWebsocketOnClose);
    }
    // unsubcribe to events
    return () => {
      wss?.removeEventListener("open", handleWebsocketOnOpen);
      wss?.removeEventListener("message", handleWebsocketOnMessage);
      wss?.removeEventListener("error", handleWebsocketOnError);
      wss?.removeEventListener("close", handleWebsocketOnClose);
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [wss]);

  return (
    <UserContext.Provider value={{ user }}>

      <WebSocketContext.Provider value={{ readyState, wss }}> 
      {/* modals */}
      <RenderModals modal={modal} onClose={handleCloseModal} />

      <div className="w-screen h-screen bg-zinc-200  dark:bg-[#111111] ">
        <div className="py-0 w-full h-full flex justify-center items-center ">
          <div className="max-w-[1500px] min-w-[1500px] bg-[#fafafa] dark:bg-[#232323] h-full shadow-lg  m-auto border dark:border-[#232323] ">
            <div className="grid grid-cols-[1.5fr_3fr] h-full">
              {/* fist grid */}
              <div className="w-full h-full max-h-full  min-w-0 min-h-0 relative">
                <FirstGridComponent
                  onShowModals={setModal}
                  onBackClick={handleBackClick}
                  onOptionClick={handleOptionClick}
                  onProfileClick={handleProfileClick}
                  firstGridComponent={firstGridComponent}
                  onShowChatPanel={setShowChatPanel}
                />
              </div>

              {/* second grid */}
              <div className="border-l dark:border-[#343434] min-w-0 min-h-0 max-h-full relative ">
               
               {
                !showChatPanel ? 

                <DefaultChat />
                :
                <div className="h-full max-h-full flex flex-col">
                  {showContactDialog && (
                    <ContactInfo
                      showContact={showContactDialog}
                      onShowContact={setShowContactDialog}
                      activeTab={activeTab}
                      setActiveTab={setActiveTab}
                    />
                  )}
                  {/* chat top bar */}
                  <div className="">
                    <ChatTopBar onClick={setShowContactDialog} />
                  </div>

                  {/*  chat message section
                   * Conversation
                   */}
                  <div className="w-full max-w-full flex-1 overflow-y-auto custom-scrollbar ">
                      <Conversation ref={chatRef} messages={messages} />
                  </div>

                  {/* message Input */}
                  <div className="basis-20 absolute bottom-0 w-full max-h-32 overflow-x-clip ">
                    <MessageInput onSubmit={handleSubmitMsg} ref={chatRef} />
                  </div>

                  {/* This element occupy the space for the message input because the message input is postion absolute  */}
                  <div className="basis-20"></div>
                </div>

                  }
              </div>
            </div>
          </div>
        </div>
      </div>
      {reconnecting && (
        <InfinityToast
          id="reconnect"
          enabler={reconnecting}
          message="Reconnecting..."
          onSetToast={setReconnectToastId}
        />
      )}
      <DefaultToaster />

      </WebSocketContext.Provider>
    </UserContext.Provider>
  );
};

export default withAuth(Chat);
