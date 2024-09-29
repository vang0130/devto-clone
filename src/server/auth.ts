// import { PrismaAdapter } from "@auth/prisma-adapter";
// import {
//   getServerSession,
//   type DefaultSession,
//   type NextAuthOptions,
// } from "next-auth";
// import { type Adapter } from "next-auth/adapters";
// import GoogleProvider from "next-auth/providers/google";

// import { env } from "t3/env";  // Ensure this path matches your environment setup
// import { db } from "t3/server/db";  // Ensure this path matches your Prisma client setup

// /**
//  * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
//  * object and keep type safety.
//  *
//  * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
//  */
// declare module "next-auth" {
//   interface Session extends DefaultSession {
//     user: {
//       id: string;
//       bio: string;
//       location: string;
//       website: string;
//       createdAt: Date;
//       posts: Post[];
//       comments: Comment[];
//       reactions: Reaction[];
//     } & DefaultSession["user"];
//   }

//   interface User {
//     id: string;
//     name: string | null;
//     email: string | null;
//     emailVerified: Date | null;
//     image: string | null;
//     bio: string | null;
//     location: string | null;
//     website: string | null;
//     createdAt: Date;
//     posts: Post[];
//     comments: Comment[];
//     reactions: Reaction[];
//   }

//   interface Post {
//     id: number;
//     name: string;
//     content: string;
//     createdAt: Date;
//     updatedAt: Date;
//     createdBy: User;
//     createdById: string;
//     tags: string[];
//     comments: Comment[];
//     reactions: Reaction[];
//     image?: string;
//     archived: boolean;
//   }
//   interface Comment {
//     id: number;
//     name: string;
//     content: string;
    
//     createdAt: Date;
//     updatedAt: Date;
    
//     children?: Comment[];
//     parent?: Comment;
//     parentId?: number;

//     createdBy: User;
//     createdById: string;
    
//     post: Post;
//     postId: number;
//  }

//   interface Reaction {
//     id: string;
//     post: Post;
//     user: User;
//     userId: string;
//     postId: number;
//     emoji: Emoji;
//   }
//   enum Emoji {
//     HEART = "HEART",
//     UNICORN = "UNICORN",
//     SURPRISE = "SURPRISE",
//     CLAP = "CLAP",
//     FIRE = "FIRE",
//   }
// }


// /**
//  * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
//  *
//  * @see https://next-auth.js.org/configuration/options
//  */
// export const authOptions: NextAuthOptions = {
//   adapter: PrismaAdapter(db) as Adapter,
//   providers: [
//     GoogleProvider({
//       clientId: env.GOOGLE_CLIENT_ID,
//       clientSecret: env.GOOGLE_CLIENT_SECRET,
//     }),
//   ],
//   callbacks: {
//     session: async ({ session, user }) => {
//       const dbUser = await db.user.findUnique({
//         where: { id: user.id },
//         include: { posts: true, comments: true }, 
//       });

//       if (!dbUser) {
//         throw new Error("User not found");
//       }

//       return {
//         ...session,
//         user: {
//           ...session.user,
//           id: dbUser.id,
//           bio: dbUser.bio,
//           location: dbUser.location,
//           website: dbUser.website,
//           createdAt: dbUser.createdAt.toISOString(),
//           posts: dbUser.posts || [],
//           comments: dbUser.comments || [],
//         },
//       };
//     },
//   },
//   pages: {
//     signIn: "/signin",
//     signOut: "/signout",
//   },
// };

// export const getServerAuthSession = () => getServerSession(authOptions);

import { PrismaAdapter } from "@auth/prisma-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";

import { env } from "t3/env";  // Ensure this path matches your environment setup
import { db } from "t3/server/db";  // Ensure this path matches your Prisma client setup

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      bio: string;
      location: string;
      website: string;
      createdAt: Date;
      posts: Post[];
      comments: Comment[];
      reactions: Reaction[];
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    name: string | null;
    email: string | null;
    emailVerified: Date | null;
    image: string | null;
    bio: string | null;
    location: string | null;
    website: string | null;
    createdAt: Date;
    posts: Post[];
    comments: Comment[];
    reactions: Reaction[];
  }

  interface Post {
    id: number;
    name: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    createdBy: User;
    createdById: string;
    tags: string[];
    comments: Comment[];
    reactions: Reaction[];
    image?: string;
    archived: boolean;
  }

  interface Comment {
    id: number;
    name: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    children?: Comment[];
    parent?: Comment;
    parentId?: number | null;
    createdBy: User;
    createdById: string;
    post: Post;
    postId: number;
  }

  interface Reaction {
    id: number;
    post: Post;
    user: User;
    userId: string;
    postId: number;
    emoji: Emoji;
  }

  enum Emoji {
    HEART = "HEART",
    UNICORN = "UNICORN",
    SURPRISE = "SURPRISE",
    CLAP = "CLAP",
    FIRE = "FIRE",
  }
}

/**
 * Now, export the interfaces outside of the module declaration 
 * so that they can be used in other files.
 */
export interface Session extends DefaultSession {
  user: {
    id: string;
    bio: string;
    location: string;
    website: string;
    createdAt: Date;
    posts: Post[];
    comments: Comment[];
    reactions: Reaction[];
  } & DefaultSession["user"];
}

export interface User {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  bio: string | null;
  location: string | null;
  website: string | null;
  createdAt: Date;
  posts: Post[];
  comments: Comment[];
  reactions: Reaction[];
}

export interface UserLite {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  bio: string | null;
  location: string | null;
  website: string | null;
  createdAt: Date;
}

export interface Post {
  id: number;
  name: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: UserLite;
  createdById: string;
  tags: string[];
  comments: CommentLite[];
  reactions: ReactionLite[];
  image?: string | null;
  archived: boolean;
}

export interface CommentLite {
  id: number;
  name: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  children?: Comment[];
  parent?: Comment;
  parentId?: number | null;
  createdById: string;
  postId: number | null;
}

export interface Comment {
  id: number;
  name: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  children?: Comment[];
  parent?: Comment;
  parentId?: number | null;
  createdBy: User;
  createdById: string;
  post: Post;
  postId: number;
}

export interface ReactionLite {
  id: number;
  userId: string;
  postId: number;
  // emoji: Emoji;
}

export interface Reaction {
  id: number;
  post: Post;
  createdBy: User;
  userId: string;
  postId: number;
  emoji: Emoji;
}

export enum Emoji {
  HEART = "HEART",
  UNICORN = "UNICORN",
  SURPRISE = "SURPRISE",
  CLAP = "CLAP",
  FIRE = "FIRE",
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    session: async ({ session, user }) => {
      const dbUser = await db.user.findUnique({
        where: { id: user.id },
        include: { posts: true, comments: true },
      });

      if (!dbUser) {
        throw new Error("User not found");
      }

      return {
        ...session,
        user: {
          ...session.user,
          id: dbUser.id,
          bio: dbUser.bio,
          location: dbUser.location,
          website: dbUser.website,
          createdAt: dbUser.createdAt.toISOString(),
          posts: dbUser.posts || [],
          comments: dbUser.comments || [],
        },
      };
    },
  },
  pages: {
    signIn: "/signin",
    signOut: "/signout",
  },
};

export const getServerAuthSession = () => getServerSession(authOptions);
