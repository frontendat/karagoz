<template>
  <div class="min-h-full">
    <nav class="flex gap-8 p-8">
      <NuxtLink to="/">Home</NuxtLink>
      <NuxtLink to="/sandbox/demos/defaults">Demo</NuxtLink>
    </nav>
    <main>
      <slot></slot>
    </main>
  </div>
</template>
<script setup lang="ts"></script>
