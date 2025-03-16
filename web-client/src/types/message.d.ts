type Meme = {
  id: number;
  name: string;
  url: string;
};

type Message = SendMessage & MessageTime;

type SendMessage = {
  room: number;
  sender: number;
  receiver: number;
  type: MessageType;
  content: string;
};

type MessageTime = {
  date: number;
};

type MessageType = 'text' | 'audio' | 'video' | 'file' | 'image';
