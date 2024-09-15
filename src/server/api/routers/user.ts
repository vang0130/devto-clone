import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "../trpc";


export const userRouter = createTRPCRouter({


  updateUserInfo: protectedProcedure
    .input(z.object({
      name: z.string().optional(),
      email: z.string().optional(),
    //   image: z.string().optional(),
      website: z.string().optional(),
      location: z.string().optional(),
      bio: z.string().optional()
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.user.update({
        where: { id: ctx.session.user.id },
        data: input,
      });
    }),

  updateProfilePicture: protectedProcedure 
    .input(z.object({ image: z.string().optional()
    }))
    .mutation( async ({ ctx, input }) => {
        return ctx.db.user.update({
            where: { id: ctx.session.user.id },
            data: input,
        });
    }),

  getUser: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.user.findUnique({
        where: { id: input.userId },
        include: { posts: true, comments: true },
      });
    }),

    findMany: publicProcedure
    .query(async ({ ctx }) => {
      return ctx.db.user.findMany();
    }),

    getAllUsers: publicProcedure
    .query(async ({ ctx }) => {
      return ctx.db.user.findMany();
    }),

});
