import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import StepBody from './StepBody.vue'

describe('StepBody', () => {
  it('renders markdown with callouts', () => {
    const wrapper = mount(StepBody, {
      props: { body: '## Hi\n\n:::tip\nuse it\n:::' },
    })
    expect(wrapper.find('h2').text()).toBe('Hi')
    expect(wrapper.find('[data-callout="tip"]').text()).toContain('use it')
  })
})
