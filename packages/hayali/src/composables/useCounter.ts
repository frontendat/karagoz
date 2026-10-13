import { ref } from 'vue'

// Placeholder composable proving the composable-test style works; replaced by
// the real lesson composables in later tickets.
export function useCounter(initial = 0) {
  const count = ref(initial)

  function increment() {
    count.value += 1
  }

  return { count, increment }
}
