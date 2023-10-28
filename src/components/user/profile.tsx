/**
 *
 */

import { useEffect } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";

import UserDetails from "./userDetails";
import GeneralLayout from "../common/generalLayout";

interface ProfileProps {
  onBackClick: any;
}

export default function Profile({ onBackClick }: ProfileProps) {
  return (
    <GeneralLayout title="Profile" onBackClick={onBackClick}>
      <UserDetails />
    </GeneralLayout>
  );
}
