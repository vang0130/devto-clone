import { z } from "zod";
import { 
  createTRPCRouter, 
  protectedProcedure, 
  publicProcedure
} from "../trpc";
import { Emoji } from "@prisma/client";

export const reactionRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        postId: z.number(),
        emoji: z.nativeEnum(Emoji), 
      })
    )
    .mutation(async ({ ctx, input }) => {
      // console.log(ctx.session.user.id);
      // console.log(input.emoji);
      // console.log(input.postId);
      return await ctx.db.reaction.create({
        data: {
          post: { connect: { id: input.postId } },
          createdBy: { connect: { id: ctx.session.user.id } },
          emoji: input.emoji,
        },
      });
    }),

  delete: protectedProcedure
    .input(
      z.object({
        postId: z.number(),
        emoji: z.nativeEnum(Emoji), // Use the same enum consistently
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.reaction.deleteMany({
        where: {
          postId: input.postId,
          userId: ctx.session.user.id,
          emoji: input.emoji,
        },
      });
      return { success: true };
    }),

  getUserReactions: protectedProcedure
    .input(
      z.object({
        postId: z.number(),
      })
    )
    .query(async ({ ctx, input }) => {
      // console.log(input.postId);
      // console.log(ctx.session.user.id);
      return ctx.db.reaction.findMany({
        where: {
          postId: input.postId,
          userId: ctx.session.user.id,
        },
      });
    }),

  getPostReactions: publicProcedure
    .input(
      z.object({
      postId: z.number(),
    })
  )
  .query(async ({ ctx, input }) => {
    return ctx.db.reaction.findMany({
      where: { postId : input.postId },
    });
  }),
});
