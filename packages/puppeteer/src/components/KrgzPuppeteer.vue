<script setup lang="ts">
import { KrgzSandbox, useKaragozSandbox } from '@karagoz/sandbox'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  ScrollArea,
  useControlledModel,
} from '@karagoz/shared'
import { computed, watch } from 'vue'

import { KrgzSlide, type KrgzStory, KrgzTopic } from '../models.ts'
import KrgzExplanation from './KrgzExplanation.vue'

const sandbox = useKaragozSandbox()

const topicModel = defineModel<number | undefined>('topic')
const slideModel = defineModel<number | undefined>('slide')

const [topicCtrl, topicIndex] = useControlledModel(topicModel, 0)
const [slideCtrl, slideIndex] = useControlledModel(slideModel, 0)

const props = defineProps<{
  story: KrgzStory
}>()

const selectedTopic = computed(() => props.story.topics.at(topicCtrl.value))

const selectedSlide = computed(() =>
  selectedTopic.value?.slides.at(slideCtrl.value),
)

const onTopicClick = (_: KrgzTopic, index: number) => {
  topicIndex(index)
  slideIndex(0)
}

const onSlideNavClick = (_: KrgzSlide, index: number) => {
  slideIndex(index)
}

watch(
  selectedSlide,
  () => {
    if (selectedSlide.value) {
      sandbox.mount(selectedSlide.value.tree, { shouldReinstall: true })
    }
  },
  { immediate: true },
)
</script>

<template>
  <ResizablePanelGroup auto-save-id="krgz-puppeteer" direction="horizontal">
    <ResizablePanel :default-size="12">
      <slot name="topics">
        <ScrollArea class="h-full overflow-auto">
          <nav class="krgz-topics">
            <h1 class="krgz-subject">{{ props.story.subject }}</h1>
            <div
              v-for="(topic, index) in props.story.topics"
              :key="index"
              class="krgz-topics"
            >
              <a href="#" @click.prevent="onTopicClick(topic, index)">{{
                topic.subject
              }}</a>
            </div>
          </nav>
        </ScrollArea>
      </slot>
    </ResizablePanel>
    <ResizableHandle with-handle />
    <ResizablePanel :default-size="33">
      <slot name="explanation">
        <template v-if="selectedSlide">
          <div class="krgz-explanation">
            <h1 v-if="selectedTopic?.subject">{{ selectedTopic.subject }}</h1>
            <KrgzExplanation :explanation="selectedSlide.explanation" />
            <nav v-if="selectedTopic">
              <a
                v-if="0 < slideCtrl"
                href="#"
                @click="onSlideNavClick(selectedSlide, slideCtrl - 1)"
                >Prev</a
              >
              <a
                v-if="slideCtrl < selectedTopic.slides.length - 1"
                href="#"
                @click="onSlideNavClick(selectedSlide, slideCtrl + 1)"
                >Next</a
              >
            </nav>
          </div>
        </template>
      </slot>
    </ResizablePanel>
    <ResizableHandle with-handle />
    <ResizablePanel :default-size="55">
      <slot name="sandbox">
        <KrgzSandbox />
      </slot>
    </ResizablePanel>
  </ResizablePanelGroup>
</template>
