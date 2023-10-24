/**
 * Setting component
 * 
 */

// use for modals that appear in the settings panel

export type ISettingModalLabel = "keyboard_shortcuts" | "theme" | ""

export interface ISettingModal {
    label:  ISettingModalLabel;
    open:boolean;
}