import { WebSocket, WebSocketServer } from "ws";
import { DrawingData, SendType, SharedState } from "../types/data.js";

import { Groups, WsConnections } from "../types/groups.js";
import { log, LogLevel } from "./log.js";
import { getRoutes } from "./routes.js";
import { isBroadcastData, isConnectData, isDrawingType, isSlideBroadcastType, isSlideConnectType } from "./data.js";

const groups: Groups = new Map();
const connections: WsConnections = new Map();

export function initServer(port: number) {
  const {  connect } = getRoutes(
    groups,
    send,
    broadcast,
    addConnection
  );

  const wss = new WebSocketServer({ port });
  wss.on("connection", (ws) => {
    ws.on("message", (message: string) => {
      const data = JSON.parse(message);
      log("--- RECEIVED ---");
      log(data);
      if (isSlideConnectType(data)) {
        connect(data, ws); 
      } else if (isDrawingType(data)) {
          broadcast(data.id, data.state,  SendType.DRAW,ws )
        } else if (isSlideBroadcastType(data)){
          broadcast(data.id, data.state,  SendType.SLIDE,ws )
        }
    }

    );

    ws.on("close", () => {
      connections.delete(ws);
    });

    ws.onerror = function () {
      log("Some Error occurred", LogLevel.ERROR);
    };
  });
}

export function addConnection(connection: WebSocket, id: string) {
  connections.set(connection, id);
}

export function removeConnection(connection: WebSocket) {
  connections.delete(connection);
}

export function send(
  ws: WebSocket,
  state: unknown,
  mtype: SendType
) {
  if (process.env.DEBUG === "info") {
    log("--- SEND ---");
    log(state);
  }
  ws.send(JSON.stringify({ mtype, state }));
}

export function broadcast(
  groupId: string,
  state: SharedState | DrawingData,
  mtype: SendType,
  connection?: WebSocket
) {
  log(state)
  for (const [conn, id] of connections.entries()) {
    if (groupId === id && conn !== connection) {
      send(conn, state, mtype);
    }
  }
}
