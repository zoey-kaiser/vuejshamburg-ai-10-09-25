import { tool } from 'ai'
import { z } from 'zod'

const locationInputSchema = z.object({
  location: z.string().describe('The location to get the weather for'),
})

export const config = {
  name: 'get_asset_by_id' as const,
  tool: tool({
    description: 'Get the weather in a location (celsius)',
    inputSchema: locationInputSchema,
    execute: async ({ location }) => {
      const temperature = Math.round(Math.random() * (40 - 0) + 0)

      return {
        location,
        temperature,
      }
    },
  }),
}
