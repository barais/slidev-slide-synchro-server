import {
    DataType,
    SendType,
    SlideDrawingData,
    WsBroadcastData,
    WsConnectData,
    WsData,
    WsDrawingBroadcastData,
    WsSlideBroadcastData,
  } from "../types/data.js";
  
  
  export function isBroadcastData(data: WsData): data is WsBroadcastData {
    return data.type === DataType.BROADCAST;
  }

  export function isDrawingType(data: SlideDrawingData): data is WsDrawingBroadcastData {
    return data.mtype === SendType.DRAW  && data.type === DataType.BROADCAST;
  }
  export function isSlideBroadcastType(data: SlideDrawingData): data is WsSlideBroadcastData {
    return data.mtype === SendType.SLIDE  && data.type === DataType.BROADCAST;
  }
  export function isSlideConnectType(data: SlideDrawingData ): data is WsConnectData {
    return data.type === DataType.CONNECT && data.mtype === SendType.SLIDE  ;
  }


  export function isConnectData(data: WsData): data is WsConnectData {
    return data.type === DataType.CONNECT;
  }
  
