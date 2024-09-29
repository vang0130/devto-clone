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
      parentId: z.number().optional(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    return ctx.db.comment.create({
      data: {
        name: input.name,
        content: input.content,
        post: { connect: { id: input.postId } },
        createdBy: { connect: { id: ctx.session.user.id } },
        parent: input.parentId ? { connect: { id: input.parentId } } : undefined,
      },
    });
  }),

  getPostComments: publicProcedure
    .input(
      z.object({
      postId: z.number(), // Expect postId to be passed as input
    })
  )

  // get two levels only, user must click to load more levels
  .query(async ({ ctx, input }) => {
    return ctx.db.comment.findMany({
      where: { postId : input.postId },
      orderBy: { createdAt: "desc"},
      include: {
        post: true, 
        createdBy: true,
        children: {
          include: {
            createdBy: true,
            children: {
              include: {
                createdBy: true,
              }
            }
          }
        } 
      },
    });
  }),

  getChildren: publicProcedure
    .input(z.object({ parentId: z.number() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.comment.findMany({
        where: { parentId: input.parentId },
        orderBy: { createdAt: "desc"},
        include: {
          createdBy: true,
          children: {
            include: {
              createdBy: true,
              children: {
                include: {
                  createdBy: true,
                }
              }
            }
          } 
        },
      });
    }),

  });


