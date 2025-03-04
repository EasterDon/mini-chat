export type Meme = {
  id: number;
  name: string;
  url: string;
};

export type MessageValue = {
  type: 'text' | 'image' | 'vedio' | 'audio';
  sender: number;
  content: string;
  date: string;
};