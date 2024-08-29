



export interface Data {
  id: string;
}

export enum DataType {
  CONNECT = "connect",
  BROADCAST = "broadcast",
}

export interface WsData extends Data {
  type: DataType;
}

export enum SendType {
  SLIDE = "slide",
  DRAW = "draw"
}

export interface SlideDrawingData extends WsData {
  mtype: SendType;
}


export interface BroadcastData extends Data {
  state: SharedState | DrawingData;
}





export interface BroadcastData extends Data {
  state: SharedState | DrawingData;
  mtype: SendType
}

export interface WsBroadcastData extends BroadcastData {
  type: DataType.BROADCAST;
}

export interface WsSlideBroadcastData extends WsBroadcastData {
  mtype: SendType.SLIDE;
  state : SharedState;
}

export interface WsDrawingBroadcastData extends WsBroadcastData {
  mtype: SendType.DRAW;
  state : DrawingData;
}


export interface ConnectData extends Data {
  state?: SharedState ;
  mtype: SendType.SLIDE
}

export interface WsConnectData extends ConnectData {
  type: DataType.CONNECT;
}





export interface DrawingData {
  dump:string;
  slideNo: number;
}
export interface SharedState {
  page: number
  clicks: number
  cursor?: {
    x: number
    y: number
  }

  viewerPage: number
  viewerClicks: number

  lastUpdate?: {
    id: string
    type: 'presenter' | 'viewer'
    time: number
  }
}
