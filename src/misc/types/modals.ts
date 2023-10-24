/**
 * Setting component
 *
 */

// use for modals that appear in the settings panel

export type IModalLabel = "keyboard_shortcuts" | "theme" | "";

export interface IModal {
  label: IModalLabel;
  open: boolean;
}
