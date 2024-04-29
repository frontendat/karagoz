<script setup lang="ts">
import { computed } from 'vue'

import { useControlledModel } from '../composables/useControlledModel.ts'
import { KrgzSlide, type KrgzStory, KrgzTopic } from '../models.ts'

const topicModel = defineModel<number | undefined>('topic', {
  default: undefined,
})
const slideModel = defineModel<number | undefined>('slide', {
  default: undefined,
})

const { value: topicCtrl, update: topicIndex } = useControlledModel(
  topicModel,
  0,
)
const { value: slideCtrl, update: slideIndex } = useControlledModel(
  slideModel,
  0,
)

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
</script>

<template>
  <div class="krgz-puppeteer">
    <div class="krgz-stage">
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
      <template v-if="selectedSlide">
        <div class="krgz-explanation">
          <h1 v-if="selectedTopic?.subject">{{ selectedTopic.subject }}</h1>
          {{ selectedSlide.explanation }}
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
