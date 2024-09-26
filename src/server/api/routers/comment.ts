import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
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

  // edit: protectedProcedure
  // .input(
  //   z.object({
  //     id: z.number().int(),
  //     name: z.string().min(1),
  //     content: z.string().min(1),
  //     tags: z.array(z.string()).min(1).max(4),
  //     image: z.string().optional(),
  //   })
  // )
  // .mutation(async ({ ctx, input }) => {
  //   return ctx.db.post.update({
  //     where: { id : input.id },
  //     data: {
  //       name: input.name,
  //       content: input.content,
  //       tags: input.tags,
  //       image: input.image,
  //       createdBy: { connect: { id: ctx.session.user.id } },
  //     },
  //   });
  // }),

  // delete: protectedProcedure
  //   .input(
  //     z.object({
  //       id: z.number().int(), // id of post to delete 
  //     })
  //   )
  //   .mutation(async ({ ctx, input }) => {
  //     return ctx.db.post.delete({
  //       where: { id: input.id },
  //     });
  //   }),

  // getPost: publicProcedure
  //   .input(z.object({ id : z.number().int() }))
  //   .query(async ({ ctx, input }) => {
  //     return ctx.db.post.findUnique({
  //       where: { id: input.id },
  //       include: { createdBy: true },
  //     });
  //   }),

  // getUserPosts: protectedProcedure
  //   .input(z.object({ userId: z.string() }))
  //   .query(async ({ ctx, input }) => {
  //   return ctx.db.post.findMany({
  //     where: { createdById: input.userId },
  //     orderBy: { createdAt: "desc" },
  //     include: { createdBy: true },
  //   });
  // }),

  // findMany: publicProcedure.query(async ({ ctx }) => {
  //   return ctx.db.post.findMany({
  //     orderBy: { createdAt: "desc" },
  //     include: { createdBy: true },  
  //     where: { archived: false },
  //   });
  // }),
  

  // count: publicProcedure.query(async ({ ctx }) => {
  //   return ctx.db.post.count({
  //   });
  // }),
    
  // searchPosts: publicProcedure
  // .input(
  //   z.object({
  //     searchslug: z.string().min(1),
  //   })
  // )
  // .query(async ({ ctx, input }) => {
  //   const { searchslug } = input;

  //   return ctx.db.$queryRaw`
  //     SELECT 
  //       "Post".*, 
  //       "User"."id" AS "userId", 
  //       "User"."name" AS "userName", 
  //       "User"."email" AS "userEmail", 
  //       "User"."image" AS "userImage"
  //     FROM "Post"
  //     JOIN "User" ON "Post"."createdById" = "User"."id"
  //     WHERE "Post"."name" ILIKE ${'%' + searchslug + '%'}
  //     OR "Post"."content" ILIKE ${'%' + searchslug + '%'}
  //     OR EXISTS (
  //       SELECT 1
  //       FROM unnest("Post"."tags") AS tag
  //       WHERE tag ILIKE ${'%' + searchslug + '%'}
  //     )
  //     ORDER BY "Post"."createdAt" DESC
  //   `;
  // }),
});



