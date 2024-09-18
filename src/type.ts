import { User, Post, Comment } from "@prisma/client";

// Define a new type that extends the Prisma `User` type and includes `posts` and `comments` relations.
export type UserWithPostsAndComments = User & {
  posts: Post[];
  comments: Comment[];
};

export type PostExport = Post & {
  name: string;
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
};
