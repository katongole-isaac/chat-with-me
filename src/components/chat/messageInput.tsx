/**
 * Message Input
 *
 */

import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { IoSendSharp } from "react-icons/io5";
import EmojiPicker from "./emojiPicker";
import ChatActions from "./actions";

interface MsgProps {
  onSubmit: Function;
  chatDivRef?: any;
}

const MessageInput = ({ onSubmit, chatDivRef }: MsgProps) => {
  const [message, setMessage] = useState("");
  const msgInputRef = useRef<HTMLTextAreaElement>(null);

  const [readyToSend, setReadyToSend] = useState(false);

  const handleOnChange = ({
    target,
  }: React.ChangeEvent<HTMLTextAreaElement>) => {
    // check if there is atleast one character in the message
    if (/[\w\S]+/g.test(target.value)) setReadyToSend(true);
    else setReadyToSend(false);

    setMessage(target.value);

    console.log(message);
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    // on press Enter key
    if (
      e.code === "Enter" &&
      readyToSend &&
      !(e.shiftKey && e.code === "Enter")
    ) {
      e.preventDefault();
      onSubmit(message.trim());
      msgInputRef.current!.value = "";
      setMessage("");
      setReadyToSend(false);

      return;
    }

    // if shiftkey + enterKey is pressed and
    // the active element is the message input,
    // increase the height of the message input
    if (
      e.shiftKey &&
      e.code === "Enter" &&
      document.activeElement === msgInputRef.current
    )
      msgInputRef.current!.rows += 1;

    // there are multi line without text, clear them and reset to rows =2
    if (e.code === "Enter" && !message && msgInputRef.current!.rows > 2) {
      e.preventDefault();
      msgInputRef.current!.rows = 2;
    }
  };

  const handleSendClick = (msg: string) => {
    if (!(readyToSend && message)) return;

    onSubmit(msg.trim());
    msgInputRef.current!.value = "";
    setMessage("");
    setReadyToSend(false);
  };

  useEffect(() => {
    document.addEventListener("keypress", handleKeyPress);

    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  });

  useEffect(() => {
    chatDivRef.current.scrollTop = chatDivRef.current.scrollHeight;
  }, [message]);

  return (
    <div className=" w-full py-2 px-2  space-x-2  bg-gray-200 dark:bg-neutral-700 ">
      <div className="w-full flex items-center justify-center gap-4">
        <div className="flex w-full items-center gap-2 px-3 bg-neutral-100 dark:bg-[#343434] ">
          {/*  message input */}
          <ChatActions />
          <div className="w-full flex-1 h-full max-h-32 overflow-y-auto custom-scrollbar ">
            <textarea
              className=" px-3 bg-transparent text-slate-700 dark:text-gray-100 rounded-md w-full focus:outline-none resize-none custom-scrollbar"
              placeholder="Write a message"
              value={message}
              ref={msgInputRef}
              onChange={(e) => handleOnChange(e)}
            />
          </div>

          <EmojiPicker onEmojiSelect={setMessage} />
        </div>

        <button
          disabled={!readyToSend}
          onClick={() => handleSendClick(message)}
          className="disabled disabled:cursor-not-allowed"
        >
          <IoSendSharp
            className={`${
              !readyToSend
                ? "text-zinc-300 dark:text-neutral-500"
                : "text-blue-600 dark:text-neutral-300"
            } text-[20px] transition-colors duration-100 `}
          />
        </button>
      </div>
    </div>
  );
};

export default React.forwardRef((props: any, ref) => (
  <MessageInput {...props} chatDivRef={ref} />
));
