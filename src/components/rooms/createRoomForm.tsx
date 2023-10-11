/**
 * Form for creating a room.
 *
 */

import { Formik, Form } from "formik";
import * as yup from "yup";

import Input from "../common/input";
import Tooltip from "../common/tootltip";

export default function CreateRoomForm({
  onCreateRoom,
  wss,
}: {
  onCreateRoom: (arg: any) => void;
  wss: WebSocket | null | undefined;
}) {
  const initialValues = {
    name: "",
    description: "",
  };

  const validationSchema = yup.object({
    name: yup
      .string()
      .min(3, "Atleast ${min} characters")
      .max(30, "Room name too long")
      .required("This is a required field"),
    description: yup
      .string()
      .min(10, "Too short description")
      .required("Please provide Room description"),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(val) => onCreateRoom(val)}
      validationSchema={validationSchema}
    >
      <Form className="flex flex-col gap-4 px-4 pr-2 w-100" autoComplete="off">
        <Input name="name" placeholder="Enter room name" />
        <Input
          name="description"
          as="textarea"
          placeholder="Room description"
          classes="resize-none"
          cols={23}
          rows={5}
        />

        <div className="flex items-center ">
          <button
            type="submit"
            disabled={!wss || wss.readyState === WebSocket.CLOSED}
            className="border p-1 px-2 text-[12px] bg-blue-600  text-white rounded-md hover:bg-blue-500  disabled:bg-blue-300 disabled:cursor-not-allowed "
          >
            Create Room
          </button>

        </div>
      </Form>
    </Formik>
  );
}
