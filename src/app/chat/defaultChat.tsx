import { GiLovers } from "react-icons/gi";
import { HiLockClosed } from "react-icons/hi";

const DefaultChat = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center relative">
      <GiLovers className="text-neutral-700 dark:text-white" size={90} />

      <div className="py-5 text-center">
        <h1 className="text-4xl "> Chat With Me </h1>
      </div>

      <div className="dark:text-gray-400 text-neutral-600 text-center">
        <p> You can connect with friends and family at any time.</p>
        <p> No other party nor any of the Chat With Me group can see your messages. </p>
      </div>

      <div className="flex gap-2 items-center absolute bottom-3 dark:text-gray-400 text-neutral-600">
        <HiLockClosed size={18} />
        <p> Your personal messages are end-to-end encrypted </p>
      </div>

    </div>
  );
};

export default DefaultChat;
