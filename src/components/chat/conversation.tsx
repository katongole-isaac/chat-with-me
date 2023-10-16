/**
 * Chat display
 *
 */
import React from "react";
import Message from "./message";

type ChatProps = {
  messages?: string[];
  chatRef?: any;
};

function Conversation({ chatRef }: ChatProps) {
  return (
    <div ref={chatRef} className="w-full px-4 py-2 pb-8 text-[14px]">
      <Message />
    </div>
  );
}

export default React.forwardRef((props: any, ref) => (
  <Conversation {...props} chatRef={ref} />
));
