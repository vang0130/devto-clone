import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "../trpc";



export const postRouter = createTRPCRouter({
  create: protectedProcedure
  .input(
    z.object({
      name: z.string().min(1),
      content: z.string().min(1),
      tags: z.array(z.string()).min(1).max(4),
      image: z.string().optional(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    return ctx.db.post.create({
      data: {
        name: input.name,
        content: input.content,
        tags: input.tags,
        image: input.image,
        createdBy: { connect: { id: ctx.session.user.id } },
      },
    });
  }),

  edit: protectedProcedure
  .input(
    z.object({
      id: z.number().int(),
      name: z.string().min(1),
      content: z.string().min(1),
      tags: z.array(z.string()).min(1).max(4),
      image: z.string().optional(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    return ctx.db.post.update({
      where: { id : input.id },
      data: {
        name: input.name,
        content: input.content,
        tags: input.tags,
        image: input.image,
        createdBy: { connect: { id: ctx.session.user.id } },
      },
    });
  }),

  delete: protectedProcedure
    .input(
      z.object({
        id: z.number().int(), // id of post to delete 
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Delete the post
      return ctx.db.post.delete({
        where: { id: input.id },
      });
    }),

  archive: protectedProcedure
    .input(
      z.object({
        id: z.number().int(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.post.update({
        where: { id: input.id },
        data: { archived: true},
      });
    }),

  unarchive: protectedProcedure
    .input(
      z.object({
        id: z.number().int(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.post.update({
        where: { id: input.id },
        data: { archived: false},
      });
    }),


  getPost: publicProcedure
    .input(z.object({ id : z.number().int() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.post.findUnique({
        where: { id: input.id },
        include: { createdBy: true },
      });
    }),
  // create: protectedProcedure
  //   .input(z.object({ name: z.string().min(1), content: z.string().min(1), tags: z.array(z.string()).max(4), image: z.string().optional(), id: z.number().optional() }))
  //   .mutation(async ({ ctx, input }) => {
  //     return ctx.db.post.upsert({
  //       where: { id: input.id },
  //       update: {
  //         // id: input.id,
  //         name: input.name,
  //         content: input.content,
  //         tags: input.tags,
  //         image: input.image,
  //         // createdBy: { connect: { id: ctx.session.user.id } },
  //       },
  //       create: {
  //         // id: input.id,
  //         name: input.name,
  //         content: input.content,
  //         tags: input.tags,
  //         image: input.image,
  //         createdBy: { connect: { id: ctx.session.user.id } },
  //       },
  //     });
  //   }),

  // getUser: publicProcedure
  //   .input(z.object({ userId: z.string() }))
  //   .query(async ({ ctx, input }) => {
  //     return ctx.db.user.findUnique({
  //       where: { id: input.userId },
  //       include: { posts: true, comments: true },
  //     });
  //   }),
  getUserPosts: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
    return ctx.db.post.findMany({
      where: { createdById: input.userId },
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



