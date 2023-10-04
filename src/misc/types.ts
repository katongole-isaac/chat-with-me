/**
 * App's types
 */

/**
 * message properties
 */
export type ChatMessage = {
  from: string;
  to: string;
  message: string;
  sentAt: Date;
  seen?: Boolean;
};

/**
 * interface for logged in user object
 */
export interface LoggedInUser {
  [index: string]: any;
  wss?: WebSocket | null;
  user: {
    [index: string]: any;
  };
}

// commands for the websocket
type Commands = "login" | "join" | "leave" | "create" | "error" | "success";

// describes message format used
export interface MessageFormat {
  type: Commands;
  params?: Record<string, any>;
}