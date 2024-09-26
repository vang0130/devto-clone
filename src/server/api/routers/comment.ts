import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
  // publicProcedure,
} from "../trpc";

export const commentRouter = createTRPCRouter({
  create: protectedProcedure
  .input(
    z.object({
      name: z.string().min(1),
      postId: z.number(),
      content: z.string().min(1),
    })
  )
  .mutation(async ({ ctx, input }) => {
    return ctx.db.comment.create({
      data: {
        name: input.name,
        content: input.content,
        post: { connect: { id: input.postId } },
        createdBy: { connect: { id: ctx.session.user.id } },
      },
    });
  }),

  getPostComments: publicProcedure
    .input(
      z.object({
      postId: z.number(), // Expect postId to be passed as input
    })
  )
  .query(async ({ ctx, input }) => {
    return ctx.db.comment.findMany({
      where: { postId : input.postId },
      orderBy: { createdAt: "desc"},
      include: { createdBy: true}
    });
  }),
  });


