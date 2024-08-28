import { WebSocket, WebSocketServer } from "ws";
import { SendType, SlideState } from "../types/data.js";

import { Groups, WsConnections } from "../types/groups.js";
import { log, LogLevel } from "./log.js";
import { getRoutes } from "./routes.js";
import { isBroadcastData, isConnectData } from "./data.js";

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
      if (isConnectData(data)) {
        connect(data, ws); 
      } else if (isBroadcastData(data)) {
        console.error('should broadcast')
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
  mtype: SendType = SendType.SLIDE
) {
  if (process.env.DEBUG === "info") {
    log("--- SEND ---");
    log(state);
  }
  ws.send(JSON.stringify({ mtype, state }));
}

export function broadcast(
  groupId: string,
  state: SlideState,
  mtype: SendType = SendType.SLIDE,
  connection?: WebSocket
) {
  for (const [conn, id] of connections.entries()) {
    if (groupId === id && conn !== connection) {
      send(conn, state, mtype);
    }
  }
}
