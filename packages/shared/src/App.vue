<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
</script>

<template>
  <section class="m-4">
    <h1>Karagoz Shared Components:</h1>
    <h2>Button</h2>
    <Button>Click me</Button>
    <h2>Tabs</h2>
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
  </section>
</template>
