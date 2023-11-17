/**
 * Message Input
 *
 */

import React, { useEffect, useLayoutEffect, useRef } from "react";
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
  const [textOffset, setTextOffset] = useState<undefined|number>(undefined);
  const msgInputRef = useRef<HTMLDivElement>(null);
  const placeholder = "Type your message here";

  const [readyToSend, setReadyToSend] = useState(false);

  const handleInputChange = (e:React.FormEvent<HTMLDivElement>) => {
   
    const range = window.getSelection()!.getRangeAt(0);
    
    setTextOffset(range.startOffset);
    
    const currentText = e.currentTarget.innerText;
    setMessage(currentText);
   
  }

  const moveCaretPosition = () => {
    if (!textOffset) return;

    const selection = window.getSelection()!;
    const range = selection.getRangeAt(0);

    range.setStart(msgInputRef.current?.firstChild!, textOffset);

    selection.removeAllRanges();
    selection.addRange(range);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if(e.key === 'Enter' && !e.shiftKey) e.preventDefault();

    //
    if(e.key === 'Enter' && e.shiftKey) {
      e.preventDefault();

      const selection = window.getSelection()!;
      const range = document.createRange();

      range.selectNode(msgInputRef.current?.firstChild!);

      const br = document.createElement("br");
      range.insertNode(br);

      // setTextOffset(range.startOffset);

    } 
    
  };

  const handleSendClick = (msg: string) => {
    if (!(readyToSend && message)) return;

    onSubmit(msg.trim());
    // msgInputRef.current!.value = "";
    setMessage("");
    setReadyToSend(false);
  };

  const handlePaste = function (event: React.ClipboardEvent) {
    event.preventDefault(); // Prevent default paste behavior

    // Get the plain text content from the clipboard
    const pastedText = event.clipboardData!.getData("text/plain");
    setMessage(pastedText);
  }

  useEffect(() => {

    msgInputRef.current!.addEventListener("keydown", handleKeyDown);
    
    return () => {
      msgInputRef.current &&
      msgInputRef.current.removeEventListener("keydown", handleKeyDown);

    };
  });

  useLayoutEffect(()=> {   moveCaretPosition();  });



  return (
    <div className=" w-full py-2 px-2  space-x-2  bg-gray-200 dark:bg-neutral-700 ">
      <div className="w-full flex items-center justify-center gap-4">
        <ChatActions />
        <div className="flex w-full items-center gap-2 px-3 bg-neutral-100 dark:bg-[#343434] rounded-md ">
          {/* emoji picker */}
          <div className="self-end pb-3 ">
            <EmojiPicker onEmojiSelect={setMessage} />
          </div>

          <div className="w-full  flex-1 h-full max-h-28 overflow-y-auto custom-scrollbar ">
            {/* message input */}
            <div
              className="w-full min-h-[2.5em] max-h-[7.4em] py-2 px-2 text-gray-800 dark:text-gray-200 [&[data-placeholder]]:before:text-gray-500  dark:[&[data-placeholder]]:before:text-zinc-400 focus:outline-none whitespace-pre-wrap break-words"
              placeholder="write a message"
              onInput={handleInputChange}
              title="Type a message"
              id="message-input"
              dir="ltr"
              onPaste={handlePaste}
              ref={msgInputRef}
              data-placeholder={placeholder}
              spellCheck
              suppressContentEditableWarning
              contentEditable
            >
              {message}
            </div>
          </div>
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
