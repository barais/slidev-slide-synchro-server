import { IncomingMessage, ServerResponse } from "http";
import { WebSocket } from "ws";

import { SendType } from "./data.js";
import { SlideState } from "./data.js";

export interface Group {
  created: Date;
  state?: SlideState;
  updated: Date;
  users: Record<string, string>;
}

export type Groups = Map<string, Group>;

export type WsConnections = Map<WebSocket, string>;
export type Connections<T extends WebSocket | ServerResponse<IncomingMessage>> =
  Map<T, string>;

export type Send<T extends WebSocket | ServerResponse<IncomingMessage>> = (
  connection: T,
  data: unknown,
  type?: SendType,
) => void;
export type Broadcast<T extends WebSocket | ServerResponse<IncomingMessage>> = (
  groupId: string,
  state: SlideState | SlideState,
  type?: SendType,
  connection?: T,
) => void;
export type AddConnection<
  T extends WebSocket | ServerResponse<IncomingMessage>
> = (connection: T, groupId: string) => void;
