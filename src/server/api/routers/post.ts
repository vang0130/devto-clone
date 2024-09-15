import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "../trpc";



export const postRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ name: z.string().min(1), content: z.string().min(1), tags: z.array(z.string()).max(4), id: z.number().optional() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.post.upsert({
        where: { id: input.id },
        update: {
          // id: input.id,
          name: input.name,
          content: input.content,
          tags: input.tags,
          // createdBy: { connect: { id: ctx.session.user.id } },
        },
        create: {
          // id: input.id,
          name: input.name,
          content: input.content,
          tags: input.tags,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

  getUserPosts: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.post.findMany({
      where: { createdBy: { id: ctx.session.user.id } },
      orderBy: { createdAt: "desc" },
      include: { createdBy: true },
    });
  }),

  findMany: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.post.findMany({
      orderBy: { createdAt: "desc" },
      include: { createdBy: true },
      // where: { createdBy: { id: ctx.session.user.id } },
    });
  }),

  count: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.post.count({
      // where: { createdBy: { id: ctx.session.user.id } },
    });
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});



