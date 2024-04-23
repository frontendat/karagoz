<script setup lang="ts">
import { computed } from 'vue'

import { type KrgzStory, KrgzTopic } from '../models.ts'

const selectedTopicIndex = defineModel<number>('topic', { default: 0 })
const selectedSlideIndex = defineModel<number>('slide', { default: 0 })

const props = defineProps<{
  story: KrgzStory
}>()

const selectedTopic = computed(() =>
  props.story.topics.at(selectedTopicIndex.value),
)

const selectedSlide = computed(() =>
  selectedTopic.value?.slides.at(selectedSlideIndex.value),
)

const onTopicClick = (topic: KrgzTopic, index: number) => {
  console.log(topic, index)
}
</script>

<template>
  <div class="krgz-puppeteer">
    <h1 class="krgz-subject">{{ props.story.subject }}</h1>

    <div class="krgz-stage">
      <nav class="krgz-topics">
        <div
          v-for="(topic, index) in props.story.topics"
          :key="index"
          class="krgz-topics"
        >
          <a @click="onTopicClick(topic, index)">{{ topic.subject }}</a>
        </div>
      </nav>
      <template v-if="selectedSlide">
        <div class="krgz-explanation">{{ selectedSlide.explanation }}</div>
        <div class="krgz-fileset">{{ selectedSlide.files }}</div>
      </template>
    </div>
  </div>
</template>

<style>
:where(.krgz-puppeteer) {
  --krgz-layout: stacked;

  container: puppeteer / inline-size;
}

@media screen and (min-width: 768px) {
  :where(.krgz-puppeteer) {
    --krgz-layout: two-cols;
  }
}

@media screen and (min-width: 992px) {
  :where(.krgz-puppeteer) {
    --krgz-layout: three-cols;
  }
}

:where(.krgz-stage) {
  display: grid;
}

:where(.krgz-stage > *) {
  outline: 1px solid #ccc;
}

:where(.krgz-topics) {
  min-width: 250px;
}

@container puppeteer style(--krgz-layout: two-cols) {
  :where(.krgz-stage) {
    grid-template-columns: 250px 1fr;
  }

  :where(.krgz-topics) {
    grid-row: span 2;
  }
}

@container puppeteer style(--krgz-layout: three-cols) {
  :where(.krgz-stage) {
    grid-template-columns: 250px repeat(2, 1fr);
  }

  :where(.krgz-topics) {
    grid-row: span 1;
  }
}
</style>
