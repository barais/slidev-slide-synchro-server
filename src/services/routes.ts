import { IncomingMessage, ServerResponse } from "http";
import { WebSocket } from "ws";

import {
  ConnectData,
  SendType,
} from "../types/data.js";
import { AddConnection, Broadcast, Group, Groups, Send } from "../types/groups.js";

import { initGroup, removeOldGroups, updateGroup } from "./groups.js";
import { log, LogLevel } from "./log.js";

export function getRoutes<
  T extends WebSocket | ServerResponse<IncomingMessage>
>(groups: Groups, send: Send<T>, broadcast: Broadcast<T>, addConnection: AddConnection<T>) {
  return {
    connect(data: ConnectData, connection: T) {
      if (data.id) {
        log(`Client connected to group "${data.id}"`, LogLevel.WARN);
        addConnection(connection, data.id);
        removeOldGroups(groups);
        if (!groups.has(data.id)) {
          initGroup(groups, data.id, data.state);
        } 
      }
    },
  };
}
