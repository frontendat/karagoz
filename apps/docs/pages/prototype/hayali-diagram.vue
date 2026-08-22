<script setup lang="ts">
// PROTOTYPE — throwaway. Resolves wayfinder ticket #55 (map #49, Karagöz Hayalî spec):
// "The diagram placeholder in a step's expanded content — what should it become?"
// Four variants of the diagram area, switchable via ?variant=. Capture the answer, then delete this route.

const VARIANTS = [
  { key: 'A', name: 'Slot (author content)' },
  { key: 'B', name: 'Image URL prop' },
  { key: 'C', name: 'Interactive diagram component' },
  { key: 'D', name: 'Dropped from v1' },
] as const

const route = useRoute()
const router = useRouter()

const variant = computed(() => {
  const q = route.query.variant
  const key = Array.isArray(q) ? q[0] : q
  return VARIANTS.some((v) => v.key === key) ? (key as string) : 'A'
})

const currentIndex = computed(() =>
  VARIANTS.findIndex((v) => v.key === variant.value),
)

function go(delta: number) {
  const next =
    VARIANTS[(currentIndex.value + delta + VARIANTS.length) % VARIANTS.length]
  router.replace({ query: { ...route.query, variant: next.key } })
}

function onKeydown(e: KeyboardEvent) {
  const target = e.target as HTMLElement | null
  if (
    target &&
    (target.tagName === 'INPUT' ||
      target.tagName === 'TEXTAREA' ||
      target.isContentEditable)
  )
    return
  if (e.key === 'ArrowLeft') go(-1)
  if (e.key === 'ArrowRight') go(1)
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown))

const isDev = import.meta.dev

// --- Variant C: tiny interactive diagram, data-driven so it reads as "a component of its own" ---
const nodes = [
  { id: 'request', label: 'Request', desc: 'Client sends GET /users/42' },
  { id: 'route', label: 'Route', desc: 'Router matches /users/:id → handler' },
  { id: 'response', label: 'Response', desc: 'Handler returns 200 + JSON body' },
]
const selected = ref(nodes[1].id)
const selectedNode = computed(
  () => nodes.find((n) => n.id === selected.value) ?? nodes[0],
)

// --- Variant B: stand-in for an author-supplied static image URL ---
const diagramImageUrl =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="480" height="120">
      <rect width="480" height="120" fill="#f8fafc"/>
      <text x="60" y="65" font-family="monospace" font-size="16" fill="#0f172a">Request</text>
      <text x="180" y="65" font-family="monospace" font-size="16" fill="#0f172a">→</text>
      <text x="210" y="65" font-family="monospace" font-size="16" fill="#0f172a">Route</text>
      <text x="300" y="65" font-family="monospace" font-size="16" fill="#0f172a">→</text>
      <text x="330" y="65" font-family="monospace" font-size="16" fill="#0f172a">Response</text>
    </svg>
  `)
</script>

<template>
  <div class="mx-auto max-w-2xl px-6 py-16">
    <div
      class="mb-8 rounded-md border border-dashed border-amber-400 bg-amber-50 px-4 py-2 text-sm text-amber-800 dark:bg-amber-950 dark:text-amber-200"
    >
      PROTOTYPE — wayfinder ticket #55. Not part of the app. Cycle variants
      below.
    </div>

    <Card>
      <CardHeader>
        <CardDescription>Chapter 2 · Step 3</CardDescription>
        <CardTitle>Wire the router</CardTitle>
      </CardHeader>
      <CardContent class="space-y-4">
        <p class="text-sm text-muted-foreground">
          Once middleware is registered, an incoming request flows through
          the route matcher before it reaches your handler. The diagram
          below shows the request lifecycle for this step.
        </p>

        <!-- VARIANT A: slot — author supplies arbitrary markup -->
        <div v-if="variant === 'A'" class="space-y-2">
          <div
            class="flex items-center justify-center gap-3 rounded-md border bg-card p-6"
          >
            <span
              class="rounded-full bg-sky-100 px-3 py-1 text-sm font-medium text-sky-800 dark:bg-sky-950 dark:text-sky-200"
              >Request</span
            >
            <span class="text-muted-foreground">→</span>
            <span
              class="rounded-full bg-violet-100 px-3 py-1 text-sm font-medium text-violet-800 dark:bg-violet-950 dark:text-violet-200"
              >Route</span
            >
            <span class="text-muted-foreground">→</span>
            <span
              class="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200"
              >Response</span
            >
          </div>
          <p class="text-xs text-muted-foreground">
            <code>&lt;template #diagram&gt;</code> — the author owns this
            markup entirely: could be styled pills like this, an inline SVG,
            a screenshot, a live embed, or nothing at all.
          </p>
        </div>

        <!-- VARIANT B: simple image-url prop -->
        <div v-else-if="variant === 'B'" class="space-y-2">
          <img
            :src="diagramImageUrl"
            alt="Request flows through Route to Response"
            class="w-full rounded-md border"
          />
          <p class="text-xs text-muted-foreground">
            <code>:diagram-src="url"</code> — a static, non-interactive
            image the author hosts and points to. No layout flexibility
            beyond the image itself.
          </p>
        </div>

        <!-- VARIANT C: interactive diagram component of its own -->
        <div v-else-if="variant === 'C'" class="space-y-3">
          <div
            class="flex items-center justify-center gap-3 rounded-md border bg-card p-6"
          >
            <template v-for="(node, i) in nodes" :key="node.id">
              <button
                type="button"
                class="rounded-full px-3 py-1 text-sm font-medium transition-colors"
                :class="
                  selected === node.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/70'
                "
                @click="selected = node.id"
              >
                {{ node.label }}
              </button>
              <span v-if="i < nodes.length - 1" class="text-muted-foreground"
                >→</span
              >
            </template>
          </div>
          <p class="rounded-md bg-muted px-3 py-2 text-sm">
            {{ selectedNode.desc }}
          </p>
          <p class="text-xs text-muted-foreground">
            A real <code>KrgzDiagram</code>-type component, data-driven
            (nodes/edges), clickable, could sync highlighted node to
            scroll/step position. Highest build cost of the four.
          </p>
        </div>

        <!-- VARIANT D: dropped from v1 -->
        <div v-else class="text-xs text-muted-foreground italic">
          (no diagram — the step ends after the paragraph above; nothing
          rendered here in v1)
        </div>
      </CardContent>
      <CardFooter class="justify-between">
        <span class="text-sm text-muted-foreground">← Prev</span>
        <span class="text-sm text-muted-foreground">Next →</span>
      </CardFooter>
    </Card>

    <div
      v-if="isDev"
      class="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-full border bg-background px-4 py-2 shadow-lg"
    >
      <button
        type="button"
        class="text-lg leading-none"
        aria-label="Previous variant"
        @click="go(-1)"
      >
        ←
      </button>
      <span class="text-sm font-medium">
        {{ variant }} ({{ VARIANTS[currentIndex].name }})
      </span>
      <button
        type="button"
        class="text-lg leading-none"
        aria-label="Next variant"
        @click="go(1)"
      >
        →
      </button>
    </div>
  </div>
</template>
