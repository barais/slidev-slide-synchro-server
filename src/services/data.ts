import {
    DataType,
    WsBroadcastData,
    WsConnectData,
    WsData,
  } from "../types/data.js";
  
  
  export function isBroadcastData(data: WsData): data is WsBroadcastData {
    return data.type === DataType.BROADCAST;
  }
  
  export function isConnectData(data: WsData): data is WsConnectData {
    return data.type === DataType.CONNECT;
  }
  
