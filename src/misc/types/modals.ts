/**
 * Setting component
 *
 */

// use for modals that appear in the settings panel

export type IModalLabel = "keyboard_shortcuts" | "theme" | "friends" | "";

export interface IModal {
  label: IModalLabel;
  open: boolean;
}
