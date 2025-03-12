export type Meme = {
  id: number;
  name: string;
  url: string;
};

export type SendMessage = {
  sender: number;
  receiver: number;
  type: 'text' | 'audio' | 'video' | 'file' | 'image';
  content: string;
};

type MessageTime = {
  date: number;
};

export type Message = SendMessage & MessageTime;