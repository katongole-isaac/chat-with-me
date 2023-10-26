/**
 * Interface used in toggling specific component to be rendered at a given time.
 *
 */

export interface IShowComponent {
  label: ShowComponentLabel;
  open: boolean;
  history: ShowComponentLabel[];
}

export type ShowComponentLabel = "" | "profile" | "settings" | "notifications" | "privacy" | "security" | "help" | "request_info" | "group" ;
