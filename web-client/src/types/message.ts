export type Meme = {
  id: number;
  name: string;
  url: string;
};

export type Message = SendMessage & MessageTime;

export type SendMessage = {
  room:number;
  sender: number;
  receiver: number;
  type: MessageType;
  content: string;
};

type MessageTime = {
  date: number;
};

export type MessageType = 'text' | 'audio' | 'video' | 'file' | 'image';
