// PROTOTYPE (throwaway): `pnpm --filter @karagoz/hayali proto:css-layout`, then drag the corner of the box.
import '@karagoz/shared/dist/karagoz-shared.css'
import '../style.css'

import { createApp, h, ref } from 'vue'

import { i18n } from '../i18n.ts'
import type { Lesson, Position } from '../types'
import PrototypeHayali from './PrototypeHayali.vue'

const lesson: Lesson = {
  chapters: [
    {
      id: 'a',
      title: 'Chapter A',
      steps: [
        { id: '1', title: 'First step', body: 'Body one.' },
        { id: '2', title: 'Second step', body: 'Body two.' },
        { id: '3', title: 'Third step', body: 'Body three.' },
      ],
    },
  ],
}

const App = {
  setup() {
    const position = ref<Position>({ chapterId: 'a', stepId: '1' })
    const box = (width: string, label: string) =>
      h('div', { style: 'margin:8px' }, [
        h('div', { style: 'font:12px sans-serif' }, label),
        h(
          'div',
          {
            style: `width:${width};height:420px;border:2px dashed #888;resize:horizontal;overflow:hidden`,
          },
          h(PrototypeHayali, {
            lesson,
            position: position.value,
            'onUpdate:position': (p: Position) => (position.value = p),
          }),
        ),
      ])
    return () => [
      box('420px', 'narrow (420px, drag me)'),
      box('1100px', 'wide (1100px, drag me)'),
    ]
  },
}
createApp(App).use(i18n).mount('#app')
