/**
 * Create Room Component
 *
 */
import { SetStateAction, useContext, useRef } from "react";

import Backdrop from "../common/backdrop";
import CreateRoomForm from "./createRoomForm";
import { UserContext } from "@/app/chat/page";
import { CommandTypes, LoggedInUser, MessageFormat } from "@/misc/types";
import useClickOutside from "@/helpers/useOutClick";

export default function CreateRoom({
  onModal,
  showModal,
}: {
  onModal: React.Dispatch<SetStateAction<boolean>>;
  showModal: boolean;
}) {
  const { wss, user } = useContext(UserContext) as LoggedInUser;

  const divRef = useRef<HTMLDivElement>(null);

  const handleCreateRoom = (values: any) => {
    if (!wss || wss?.readyState === WebSocket.CLOSED) return;

    const { name, description } = values;

    // data for the room to be created
    const payload = {
      ownerId: user.uid,
      name,
      description,
    };

    // message type to send
    const create_room_message: MessageFormat = {
      type: CommandTypes.CREATE_ROOM,
      params: payload,
    };

    // sending the data
    wss.send(JSON.stringify(create_room_message));

    // close the modal
    onModal(false);
  };

  useClickOutside({
    popupRef: divRef,
    onSetShowModal: onModal,
    showModal: showModal,
    originRef: null,
  });

  return (
    <Backdrop>
      <div
        ref={divRef}
        className="max-w-[350px] min-w-[350px] pb-1 bg-white min-h-[340px] border  "
      >
        <div className="px-4 py-2 font-medium">
          <p> Create a Room </p>
        </div>
        <div className="mt-4">
          <CreateRoomForm onCreateRoom={handleCreateRoom} wss={wss} />
        </div>
      </div>
    </Backdrop>
  );
}
