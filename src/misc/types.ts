/**
 * App's types
 */

/**
 * message properties
 */
export interface ChatMessage{
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
// defining command types.
// ==================
// SAME AS THE BACKEND
//====================
export enum CommandTypes {
  LOGIN = "login",
  JOIN_ROOM = "join",
  LEAVE_ROOM = "leave",
  CREATE_ROOM = "create",
  ERROR_ROOM = "error",
  GET_ROOMS_INFO = "getRoomsInfo",
  SUCCESS_ROOM = "success",
}

// describes message format used
export interface MessageFormat {
  type: CommandTypes;
  params?: Record<string, any>;
}


