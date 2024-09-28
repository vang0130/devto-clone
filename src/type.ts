import { User, Post, Comment, Reaction } from "@prisma/client";

// Define a new type that extends the Prisma `User` type and includes `posts` and `comments` relations.
export type UserWithPostsAndComments = User & {
  posts: Post[];
  comments: Comment[];
};

export type PostExport = Post & {
  name: string;
  id: number;
  content: string;
  image: string | null; // Allow image to be null
  createdBy: {
    id: string;
    name: string | null;
    email: string | null;
    emailVerified: Date | null;
    image: string | null;
    bio: string | null;
    location: string | null;
    website: string | null;
    createdAt: Date;
  };
  comments: Comment[];
  reactions: Reaction[];
};

export type CommentExport = Comment & {
  id: number;
  name: string;
  content: string;
  
  createdAt: Date;
  updatedAt: Date;
  
  children?: CommentExport[];
  parent?: CommentExport;
  parentId?: number;

  createdBy: UserExport;
  createdById: string;
  
  post: PostExport;
  postId: number;
}

export type UserExport = User & {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  bio: string | null;
  location: string | null;
  website: string | null;
  createdAt: Date;
  posts: PostExport[];
  comments: CommentExport[];
  reactions: ReactionExport[];
}

export type ReactionExport = Reaction & {
  id: string;
  post: PostExport;
  user: UserExport;
  userId: string;
  postId: number;
  // emoji: Emoji;
}
// export type Emoji = Emorji & {
//   HEART = "HEART",
//   UNICORN = "UNICORN",
//   SURPRISE = "SURPRISE",
//   CLAP = "CLAP",
//   FIRE = "FIRE",
// }