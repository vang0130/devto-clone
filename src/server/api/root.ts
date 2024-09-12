// import { postRouter } from "t3/server/api/routers/post";
import { createCallerFactory, createTRPCRouter } from "t3/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  // post: postRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);

// POST>TS

// import { z } from "zod";

// import {
//   createTRPCRouter,
//   protectedProcedure,
//   publicProcedure,
// } from "t3/server/api/trpc";

// export const postRouter = createTRPCRouter({
//   hello: publicProcedure
//     .input(z.object({ text: z.string() }))
//     .query(({ input }) => {
//       return {
//         greeting: `Hello ${input.text}`,
//       };
//     }),

//   create: protectedProcedure
//     .input(z.object({ name: z.string().min(1), content: z.string() }))
//     .mutation(async ({ ctx, input }) => {
//       return ctx.db.post.create({
//         data: {
//           name: input.name,
//           content: input.content, // Add this line
//           createdBy: { connect: { id: ctx.session.user.id } },
//         },
//       });
//     }),

//   getLatest: protectedProcedure.query(async ({ ctx }) => {
//     const post = await ctx.db.post.findFirst({
//       orderBy: { createdAt: "desc" },
//       where: { createdBy: { id: ctx.session.user.id } },
//     });
// // 
//     return post ?? null;
//   }),

//   getSecretMessage: protectedProcedure.query(() => {
//     return "you can now see this secret message!";
//   }),
// });