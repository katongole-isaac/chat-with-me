/**
 * List the avaiable keyboard shortcuts
 *
 */

import { IShortCut } from "@/misc/types/keyboardShortcut";

const keyboardShortcuts: IShortCut[] = [
  { label: "Mark as unread", keys: ["Cmd", "Shift", "U"] },
  { label: "Archive chat", keys: ["Cmd", "Shift", "U"] },
  { label: "Pin chat", keys: ["Cmd", "Shift", "P"] },
  { label: "Search chat", keys: ["Cmd", "Shift", "F"] },
  { label: "New group", keys: ["Cmd", "Shift", "N"] },
  { label: "Next chat", keys: ["Ctrl", "Tab"] },
  { label: "New chat", keys: ["Cmd", "N"] },
  { label: "Previous chat", keys: ["Cmd", "Shift", "Tab"] },
  { label: "Mute", keys: ["Cmd", "Shift", "M"] },
  { label: "Increase speed of voice message", keys: ["Shift", "."] },
  { label: "Settings", keys: ["Shift", ","] },
  { label: "Delete chat", keys: ["Cmd", "Shift", "D"] },
  { label: "Search", keys: ["Cmd", "F"] },
  { label: "Profile & About", keys: ["Cmd", "P"] },
  { label: "Decrease speed of voice message", keys: ["Shift", "."] },
  { label: "Emoji Panel", keys: ["Cmd", "E"] },
  { label: "Sticker Panel", keys: ["Cmd", "S"] },
];

export default keyboardShortcuts;
