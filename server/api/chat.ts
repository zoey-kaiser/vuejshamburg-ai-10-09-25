import type { UIMessage } from 'ai'
import { createOpenAI } from '@ai-sdk/openai'
import { convertToModelMessages, stepCountIs, streamText, tool } from 'ai'
import { z } from 'zod'

export default defineLazyEventHandler(async () => {
  const apiKey = useRuntimeConfig().openaiApiKey
  if (!apiKey) {
    throw new Error('Missing OpenAI API key')
  }

  const openai = createOpenAI({ apiKey })

  return defineEventHandler(async (event: any) => {
    const { messages }: { messages: UIMessage[] } = await readBody(event)

    const result = streamText({
      model: openai('gpt-4o-mini'),
      messages: convertToModelMessages(messages),
      stopWhen: stepCountIs(5),
      temperature: 0,
      tools: {
        getWeatherByLocation: tool({
          description: 'Get the weather in a location (celsius)',
          inputSchema: z.object({
            location: z.string().describe('The location to get the weather for'),
          }),
          execute: async ({ location }) => {
            const temperature = Math.round(Math.random() * (40 - 0) + 0)
            return { location, temperature }
          },
        }),
        getRepositoryByOrgAndName: tool({
          description: 'Retrieve information about a specific Github repository by its organisation and name',
          inputSchema: z.object({
            org: z.string().describe('The github organisation or user that has the repo'),
            name: z.string().describe('The name of the repository'),
          }),
          execute: ({ org, name }) => {
            return $fetch(`https://api.github.com/repos/${org}/${name}`)
          },
        }),
      },
    })

    return result.toUIMessageStreamResponse()
  })
})
