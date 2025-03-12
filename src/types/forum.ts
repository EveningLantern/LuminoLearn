
export interface Message {
  id: number;
  authorId: string;
  authorName: string;
  content: string;
  timestamp: string;
}

export interface ForumData {
  [key: string]: Message[];
}

export interface ForumTitles {
  [key: string]: string;
}
