<script setup lang="ts">
import { Files, Terminal } from 'lucide-vue-next'

import KaragozLogo from '@/components/KaragozLogo.vue'
import { Button } from '@/components/ui/button'
import LoadingIndicator from '@/components/ui/loading-indicator/LoadingIndicator.vue'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
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
    <KaragozLogo class="size-16" />
    <h1 class="text-4xl">Karagoz Shared Components:</h1>

    <h2 class="mb-4 mt-8">Button</h2>
    <Button>Default</Button>
    <Button variant="destructive">Destructive</Button>
    <Button variant="ghost">Ghost</Button>
    <Button variant="link">Link</Button>
    <Button variant="outline">Outline</Button>
    <Button variant="secondary">Secondary</Button>

    <h2 class="mb-4 mt-8">Loading Indicator</h2>
    <div class="h-[200px] w-[200px]">
      <LoadingIndicator label="Loading...">
        <Files class="size-12" />
      </LoadingIndicator>
    </div>

    <h2 class="mb-4 mt-8">Resizable</h2>
    <div class="h-[500px] w-[500px]">
      <ResizablePanelGroup
        id="demo-group-1"
        direction="horizontal"
        class="max-w-md rounded-lg border"
      >
        <ResizablePanel id="demo-panel-1" :default-size="50">
          <div class="flex h-[200px] items-center justify-center p-6">
            <span class="font-semibold">One</span>
          </div>
        </ResizablePanel>
        <ResizableHandle id="demo-handle-1" />
        <ResizablePanel id="demo-panel-2" :default-size="50">
          <ResizablePanelGroup id="demo-group-2" direction="vertical">
            <ResizablePanel id="demo-panel-3" :default-size="25">
              <div class="flex h-full items-center justify-center p-6">
                <span class="font-semibold">Two</span>
              </div>
            </ResizablePanel>
            <ResizableHandle id="demo-handle-2" />
            <ResizablePanel id="demo-panel-4" :default-size="75">
              <div class="flex h-full items-center justify-center p-6">
                <span class="font-semibold">Three</span>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>

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
