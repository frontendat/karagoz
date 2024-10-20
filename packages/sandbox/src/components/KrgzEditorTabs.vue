<script setup lang="ts">
import { useSharedWebContainer } from '../composables/useSharedWebContainer.ts'

const wc = useSharedWebContainer()
</script>

<template>
  <div class="krgz-editor-tabs">
    <ul class="krgz-editor-tabs-list">
      <li
        v-for="tab of wc.tabs.value"
        :key="tab.path"
        class="krgz-editor-tabs-item"
        :class="{ 'is-active': tab.order === wc.latestTab.value?.order }"
        @click="wc.fileOpen(tab.path)"
      >
        <span class="krgz-editor-tabs-item-name" :title="tab.path">{{
          tab.path.split('/').at(-1)
        }}</span>
        <span
          class="krgz-editor-tabs-item-close"
          @click.stop="wc.fileClose(tab.path)"
          >&times;</span
        >
      </li>
    </ul>
  </div>
</template>

<style>
@layer krgz {
  .krgz-editor-tabs-list {
    display: flex;
    gap: 0.25rem;
    margin: 0;
    overflow: auto;
    padding: 0;
    user-select: none;
  }

  /* For modern browsers */
  .krgz-editor-tabs-list::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }

  .krgz-editor-tabs-list::-webkit-scrollbar-thumb {
    background-color: currentColor;
  }

  .krgz-editor-tabs-list::-webkit-scrollbar-track {
    background: transparent;
  }

  /* For Firefox */
  .krgz-editor-tabs-list* {
    scrollbar-width: thin;
    scrollbar-color: currentColor transparent;
  }

  .krgz-editor-tabs-item {
    border-bottom: 2px solid #ccc;
    box-sizing: border-box;
    background: #eee;
    color: #999;
    cursor: pointer;
    display: flex;
    gap: 0.5rem;
    padding: 0.25rem;
    padding-inline-start: 0.5rem;
    justify-content: center;
    width: 124px;
  }
  .krgz-editor-tabs-item:where(.is-active) {
    background: none;
    border-bottom-color: #999;
    color: currentColor;
  }
  .krgz-editor-tabs-item-name {
    flex-grow: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .krgz-editor-tabs-item-close {
    --size: 12px;

    background: #ccc;
    border-radius: calc(var(--size) / 2);
    cursor: pointer;
    height: var(--size);
    line-height: var(--size);
    text-align: center;
    min-width: var(--size);
  }
}
</style>
