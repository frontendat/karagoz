import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import KrgzHayali from './KrgzHayali.vue'

describe('KrgzHayali', () => {
  it('mounts and reacts to interaction', async () => {
    const wrapper = mount(KrgzHayali)

    expect(wrapper.find('[data-testid="krgz-hayali"]').exists()).toBe(true)
    await wrapper.find('button').trigger('click')
    expect(wrapper.find('button').text()).toBe('1')
  })
})
