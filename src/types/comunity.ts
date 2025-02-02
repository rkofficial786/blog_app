interface User {
    id?: string;
    name: string;
    avatar: string;
    username?: string;
    hasSubscription?: boolean;
  }
  
  interface Reply {
    id: string;
    user: User;
    comment: string;
    timestamp: string;
    likes: number;
  }
  
  interface Comment {
    id: string;
    user: User;
    comment: string;
    timestamp: string;
    likes: number;
    replies: Reply[];
  }