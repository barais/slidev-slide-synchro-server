import { IncomingMessage, ServerResponse } from "http";
import { WebSocket } from "ws";

import { SendType, SharedState } from "./data.js";
import { DrawingData } from './data.js';

export interface Group {
  created: Date;
  state?: SharedState;
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
  mtype: SendType,
) => void;
export type Broadcast<T extends WebSocket | ServerResponse<IncomingMessage>> = (
  groupId: string,
  state: SharedState | DrawingData,
  mtype: SendType,
  connection?: T,
) => void;
export type AddConnection<
  T extends WebSocket | ServerResponse<IncomingMessage>
> = (connection: T, groupId: string) => void;
