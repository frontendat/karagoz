import { computed, ModelRef, Ref, ref, watch } from 'vue'

export const useControlledModel = <T, M extends PropertyKey>(
  model: ModelRef<T | undefined, M>,
  initial: T,
) => {
  // Using generics, there was no way to stop volar from complaining without `as Ref<T>`.
  // This answer didn't work:
  // https://github.com/vuejs/core/discussions/9564#discussioncomment-7518938
  const fallback = ref(initial) as Ref<T>

  watch(model, (value) => {
    if (value !== undefined) {
      fallback.value = value
    }
  })

  const withFallback = computed(() =>
    typeof model.value === 'undefined' ? fallback.value : model.value,
  )

  const update = (value: T) => {
    model.value = value
    fallback.value = value
  }

  return { value: withFallback, update }
}
