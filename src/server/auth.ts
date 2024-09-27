// import { PrismaAdapter } from "@auth/prisma-adapter";
// import {
//   getServerSession,
//   type DefaultSession,
//   type NextAuthOptions,
// } from "next-auth";
// import { type Adapter } from "next-auth/adapters";
// import GoogleProvider from "next-auth/providers/google";

// import { env } from "t3/env";
// import { db } from "t3/server/db";

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
//       // ...other properties
//       // role: UserRole;
//       // name: 
//       bio: string;
//       location: string;
//       website: string;
//       createdAt: string;
//       posts: Post[];
//       comments: Comment[];
//     } & DefaultSession["user"];
//   }

//   // interface User {
//   //   // ...other properties
//   //   // role: UserRole;
//   // }
//   interface User {
//     id: string;
//     name: string | null;
//     email: string | null;
//     emailVerified: Date | null;
//     image: string | null;
//     bio: string | null;
//     location: string | null;
//     website: string | null;
//     // accounts?: Account[];
//     sessions: Session[];
//     createdAt: Date;
//     posts: Post[];
//     comments: Comment[];
// }

//   interface Post {
//     id: string;
//     name: string;
//     content: string;
//     createdAt: string;
//     createdBy: User;
//     createdById: string;
//     tags: String[];
//     Comment: Comment[];
//   }
//   interface Comment {
//     id: string;
//     content: string;
//     createdAt: string;
//     name: string;
//     updatedAt: DateTime;

//   }
// }

// /**
//  * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
//  *
//  * @see https://next-auth.js.org/configuration/options
//  */
// export const authOptions: NextAuthOptions = {
//   callbacks: {
//     session: ({ session, user }) => ({
//       ...session,
//       user: {
//         ...session.user,
//         id: user.id,
//       },
//     }),
//   },
//   adapter: PrismaAdapter(db) as Adapter,
//   providers: [
//     GoogleProvider({
//       clientId: env.GOOGLE_CLIENT_ID,
//       clientSecret: env.GOOGLE_CLIENT_SECRET,
//       // authorization: {
//       //   params: {
//       //     prompt: "consent",
//       //     access_type: "offline",
//         //   response_type: "code",
//         // },
//       // }
//     }),
//     /**
//      * ...add more providers here.
//      *
//      * Most other providers require a bit more work than the Discord provider. For example, the
//      * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
//      * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
//      *
//      * @see https://next-auth.js.org/providers/github
//      */
//   ],
//   pages: {
//     signIn: "/signin",
//     signOut: "/signout",
//   }
// };

// /**
//  * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
//  *
//  * @see https://next-auth.js.org/configuration/nextjs
//  */
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
    content: string;
    createdAt: Date;
    updatedAt: Date;
    createdBy: User;
    createdById: string;
    post: Post;
    postId: number;
    name: string;
 }

  interface Reaction {
    id: string;
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