export interface User {
  id: string;
  name: string;
  username: string;
  initials: string;
}

export interface Comment {
  id: string;
  text: string;
  author: User;
  mentions: User[];
  timestamp: string;
}
