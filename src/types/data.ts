



export interface Data {
  id: string;
}

export interface BroadcastData extends Data {
  state: SlideState;
}

export enum DataType {
  CONNECT = "connect",
  BROADCAST = "broadcast",
}

export interface WsData extends Data {
  type: DataType;
}


export interface BroadcastData extends Data {
  state: SlideState;
}

export interface WsBroadcastData extends BroadcastData {
  type: DataType.BROADCAST;
}

export interface ConnectData extends Data {
  state?: SlideState;
}

export interface WsConnectData extends ConnectData {
  type: DataType.CONNECT;
}

export enum SendType {
  SLIDE = "slide",
  DRAW = "draw"
}


export interface SlideState {
  mtype: SendType.SLIDE
  data: SharedState
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
