<script setup lang="ts">
import { Terminal } from 'lucide-vue-next'

import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Toggle } from '@/components/ui/toggle'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
</script>

<template>
  <section class="m-4">
    <h1 class="text-4xl">Karagoz Shared Components:</h1>
    <h2 class="mb-4 mt-8">Button</h2>
    <Button>Default</Button>
    <Button variant="destructive">Destructive</Button>
    <Button variant="ghost">Ghost</Button>
    <Button variant="link">Link</Button>
    <Button variant="outline">Outline</Button>
    <Button variant="secondary">Secondary</Button>
    <h2 class="mb-4 mt-8">Tabs</h2>
    <Tabs default-value="account" class="w-[400px]">
      <TabsList>
        <TabsTrigger value="account"> Account </TabsTrigger>
        <TabsTrigger value="password"> Password </TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        Make changes to your account here.
      </TabsContent>
      <TabsContent value="password"> Change your password here. </TabsContent>
    </Tabs>
    <h2 class="mb-4 mt-8">Toggle</h2>
    <Toggle variant="default"> Default </Toggle>
    <Toggle variant="outline"> Outline </Toggle>
    <Toggle variant="default">
      <Terminal class="size-5" />
    </Toggle>
    <h2 class="mb-4 mt-8">Tooltip</h2>
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger as-child>
          <Button variant="outline"> Hover </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add to library</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </section>
</template>
