import { computed, ModelRef, Ref, ref, watch } from 'vue'

/**
 * Composable to enable controlling a model value within the defining component
 * when parent doesn't define a 2-way binding.
 *
 * A watcher is defined to sync the fallback value with the model's value.
 * The watcher is deep by default. To make it shallow pass `{ deep: false }` in the options.
 *
 * @param model
 * @param initial
 * @param options
 */
export const useControlledModel = <T, M extends PropertyKey = string>(
  model: ModelRef<T | undefined, M>,
  initial: T,
  options: { deep: boolean } = { deep: true },
) => {
  // Using generics, there was no way to stop volar from complaining without `as Ref<T>`.
  // This answer didn't work:
  // https://github.com/vuejs/core/discussions/9564#discussioncomment-7518938
  const fallback = ref(initial) as Ref<T>

  watch(
    model,
    (value) => {
      if (value !== undefined) {
        fallback.value = value
      }
    },
    { deep: options.deep },
  )

  const withFallback = computed(() =>
    typeof model.value === 'undefined' ? fallback.value : model.value,
  )

  const update = (value: T) => {
    model.value = value
    fallback.value = value
  }

  return [withFallback, update] as [typeof withFallback, typeof update]
}
