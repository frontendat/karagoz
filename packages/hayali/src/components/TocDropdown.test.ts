import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { createI18n } from 'vue-i18n'

import { en } from '../locales'
import type { StepGroup } from '../composables/useLessonPosition'
import TocDropdown from './TocDropdown.vue'

const i18n = createI18n({ legacy: false, locale: 'en', messages: { en } })

const multi: StepGroup[] = [
  {
    chapterId: 'c1',
    title: 'Basics',
    steps: [
      { position: { chapterId: 'c1', stepId: 's1' }, title: 'One' },
      { position: { chapterId: 'c1', stepId: 's2' }, title: 'Two' },
    ],
  },
  {
    chapterId: 'c2',
    title: 'Advanced',
    steps: [{ position: { chapterId: 'c2', stepId: 's1' }, title: 'Three' }],
  },
]

const single: StepGroup[] = [
  {
    chapterId: 'c1',
    steps: [
      { position: { chapterId: 'c1', stepId: 's1' }, title: 'One' },
      { position: { chapterId: 'c1', stepId: 's2' }, title: 'Two' },
    ],
  },
]

const all = (sel: string) => [
  ...document.body.querySelectorAll<HTMLElement>(sel),
]

const open = async (groups: StepGroup[]) => {
  const wrapper = mount(TocDropdown, {
    props: { groups, current: { chapterId: 'c1', stepId: 's1' } },
    global: { plugins: [i18n] },
    attachTo: document.body,
  })
  await wrapper.find('[data-testid="toc-trigger"]').trigger('keydown', {
    key: 'Enter',
  })
  await flushPromises()
  return wrapper
}

describe('TocDropdown', () => {
  let wrapper: Awaited<ReturnType<typeof open>>
  afterEach(() => wrapper.unmount())

  it('lists steps grouped under chapter headers', async () => {
    wrapper = await open(multi)
    expect(
      all('[data-testid="toc-chapter"]').map((e) => e.textContent),
    ).toEqual(['Basics', 'Advanced'])
    expect(
      all('[data-testid="toc-step"]').map((e) => e.textContent?.trim()),
    ).toEqual(['One', 'Two', 'Three'])
  })

  it('flattens a single-chapter lesson without a header', async () => {
    wrapper = await open(single)
    expect(all('[data-testid="toc-chapter"]')).toHaveLength(0)
    expect(all('[data-testid="toc-step"]')).toHaveLength(2)
  })

  it('marks the current step and uses plain items, not menu items', async () => {
    wrapper = await open(multi)
    const steps = all('[data-testid="toc-step"]')
    expect(steps.map((s) => s.getAttribute('aria-current'))).toEqual([
      'step',
      null,
      null,
    ])
    expect(all('[role="menuitem"]')).toHaveLength(0)
  })

  it('emits the clicked position and closes', async () => {
    wrapper = await open(multi)
    all('[data-testid="toc-step"]')[2].click()
    await flushPromises()
    expect(wrapper.emitted('select')).toEqual([
      [{ chapterId: 'c2', stepId: 's1' }],
    ])
    expect(all('[data-testid="toc-step"]')).toHaveLength(0)
  })
})
