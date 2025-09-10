<script setup lang="ts">
import { Chat } from '@ai-sdk/vue'
import { getTextFromMessage } from '@nuxt/ui/utils/ai'
import { ref } from 'vue'

const input = ref('')
const chat = new Chat({})

function handleSubmit(e: Event) {
  e.preventDefault()
  chat.sendMessage({ text: input.value })
  input.value = ''
}
</script>

<template>
  <UDashboardPanel>
    <template #body>
      <UContainer>
        <UChatMessages
          :messages="chat.messages"
          :status="chat.status"
          :assistant="{
            side: 'left',
            variant: 'outline',
            avatar: {
              icon: 'i-lucide-bot',
            },
          }"
        >
          <template #content="{ message }">
            <p>
              {{ getTextFromMessage(message) }}
            </p>
          </template>
        </UChatMessages>
      </UContainer>
    </template>

    <template #footer>
      <UContainer class="mb-4">
        <UChatPrompt
          v-model="input"
          :error="chat.error"
          @submit="handleSubmit"
        >
          <UChatPromptSubmit
            :status="chat.status"
            color="neutral"
            @stop="chat.stop"
            @reload="chat.regenerate"
          />
        </UChatPrompt>
      </UContainer>
    </template>
  </UDashboardPanel>
</template>
