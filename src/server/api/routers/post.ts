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
      include: { createdBy: true, Comment: true }, 

      where: { archived: false },
    });
  }),
  

  count: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.post.count({
      // where: { createdBy: { id: ctx.session.user.id } },
    });
  }),

// searchPosts: publicProcedure
//   .input(
//     z.object({
//       searchslug: z.string().min(1),
//     })
//   )
//   .query(async ({ ctx, input }) => {
//     const { searchslug } = input;

//     return ctx.db.post.findMany({
//       where: {
//         OR: [
//           { name: { contains: searchslug, mode: "insensitive" } },
//           { content: { contains: searchslug, mode: "insensitive" } },
//           { tags: { has: searchslug } },
//         ],
//       },
//       include: {
//         createdBy: true, 
//       },
//       orderBy: {
//         createdAt: "desc", 
//       },
//     });
//   }),

// searchPosts: publicProcedure
//   .input(
//     z.object({
//       searchslug: z.string().min(1),
//     })
//   )
//   .query(async ({ ctx, input }) => {
//     const { searchslug } = input;

//     return ctx.db.post.findMany({
//       where: {
//         OR: [
//           { name: { contains: searchslug, mode: "insensitive" } },
//           { content: { contains: searchslug, mode: "insensitive" } },
//           { tags: { some: { contains: searchslug, mode: "insensitive" } } }, // Use "some" to match at least one tag containing the searchslug
//         ],
//       },
//       include: {
//         createdBy: true,
//       },
//       orderBy: {
//         createdAt: "desc",
//       },
//     });
//   }),
// searchPosts: publicProcedure
//   .input(
//     z.object({
//       searchslug: z.string().min(1),
//     })
//   )
//   .query(async ({ ctx, input }) => {
//     const { searchslug } = input;
//     return ctx.db.$queryRaw`
//       SELECT * FROM "Post"
//       WHERE "name" ILIKE ${'%' + searchslug + '%'}
//       OR "content" ILIKE ${'%' + searchslug + '%'}
//       OR EXISTS (
//         SELECT 1
//         FROM unnest("tags") AS tag
//         WHERE tag ILIKE ${'%' + searchslug + '%'}
//       )
//       ORDER BY "createdAt" DESC 
//     -- include: { createdBy: true },  
//     `;
    
    searchPosts: publicProcedure
  .input(
    z.object({
      searchslug: z.string().min(1),
    })
  )
  .query(async ({ ctx, input }) => {
    const { searchslug } = input;

    return ctx.db.$queryRaw`
      SELECT 
        "Post".*, 
        "User"."id" AS "userId", 
        "User"."name" AS "userName", 
        "User"."email" AS "userEmail", 
        "User"."image" AS "userImage"
      FROM "Post"
      JOIN "User" ON "Post"."createdById" = "User"."id"
      WHERE "Post"."name" ILIKE ${'%' + searchslug + '%'}
      OR "Post"."content" ILIKE ${'%' + searchslug + '%'}
      OR EXISTS (
        SELECT 1
        FROM unnest("Post"."tags") AS tag
        WHERE tag ILIKE ${'%' + searchslug + '%'}
      )
      ORDER BY "Post"."createdAt" DESC
    `;
  }),

    // Fetch posts where name or content matches the search term
    // const postsByNameOrContent = await ctx.db.post.findMany({
    //   where: {
    //     OR: [
    //       { name: { contains: searchslug, mode: "insensitive" } },
    //       { content: { contains: searchslug, mode: "insensitive" } },
    //       { tags: {has: "#tag1"}},
    //     ],
    //   },
    //   include: {
    //     createdBy: true,
    //   },
    //   orderBy: {
    //     createdAt: "desc",
    //   },
    // });
    // console.table(postsByNameOrContent);
    // return postsByNameOrContent

    // // Fetch posts where tags exactly match the search term (no partial match here)
    // const postsByExactTagMatch = await ctx.db.post.findMany({
    //   where: {
    //     tags: { has: searchslug },
    //   },
    //   include: {
    //     createdBy: true,
    //   },
    //   orderBy: {
    //     createdAt: "desc",
    //   },
    // });

    // Combine both result sets (removing duplicates)
    // const allPosts = [...postsByNameOrContent, ...postsByExactTagMatch];

    // const allPosts = [...postsByNameOrContent];
    // // // Eliminate any duplicate posts by id
    // // const uniquePosts = Array.from(new Set(allPosts.map((post) => post.id)))
    // //   .map((id) => allPosts.find((post) => post.id === id));

    // // Optionally, handle case where tag contains a partial match (not fully supported by Prisma, so manual filtering)
    // const postsWithPartialTagMatch = allPosts.filter((post) =>
    //   post.tags.some((tag) => tag.toLowerCase().includes(searchslug.toLowerCase()))
    // );

    // // Merge posts with partial tag match
    // const finalPosts = Array.from(new Set([...uniquePosts, ...postsWithPartialTagMatch]));

    // return finalPosts;
  // }),

  // searchPosts: publicProcedure
  // .input(
  //   z.object({
  //     searchslug: z.string().min(1),
  //   })
  // )
  // .query(async ({ ctx, input }) => {
  //   const { searchslug } = input;

  //   const posts = await ctx.db.post.findMany({
  //     where: {
  //       OR: [
  //         { name: { contains: searchslug, mode: "insensitive" } },
  //         { content: { contains: searchslug, mode: "insensitive" } },
  //       ],
  //     },
  //     include: {
  //       createdBy: true,
  //     },
  //     orderBy: {
  //       createdAt: "desc",
  //     },
  //   });

  //   // Now filter posts by tags manually (simulate regex-like matching)
  //   const filteredPosts = posts.filter((post) =>
  //     post.tags.some((tag) =>
  //       tag.toLowerCase().includes(searchslug.toLowerCase())
  //     )
  //   );

  //   return filteredPosts;
  // }),


  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});



