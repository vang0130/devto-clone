import { User, Post, Comment } from "@prisma/client";

// Define a new type that extends the Prisma `User` type and includes `posts` and `comments` relations.
export type UserWithPostsAndComments = User & {
  posts: Post[];
  comments: Comment[];
};

export type PostExport = Post & {
    name: string;
    content: string;
    image: string;
}
