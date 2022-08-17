import { createRouter } from './context'
import { z } from 'zod'

export const snippetRouter = createRouter()
  .query('hello', {
    input: z
      .object({
        text: z.string().nullish(),
      })
      .nullish(),
    resolve({ input }) {
      return {
        greeting: `Hello ${input?.text ?? 'world'}`,
      }
    },
  })
  .mutation('saveSnippet', {
    input: z.object({
      text: z.string(),
    }),
    async resolve({ ctx, input }) {
      const snippet = await ctx.prisma.snippet.create({
        data: { text: input.text },
      })
      return snippet
    },
  })
// .query('getAll', {
//   async resolve({ ctx }) {
//     return await ctx.prisma.example.findMany()
//   },
// })
