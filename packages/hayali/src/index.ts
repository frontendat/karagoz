import './style.css'

import { calloutPlugin, createCalloutRegistry } from './callouts'
import KrgzHayali from './components/KrgzHayali.vue'
import StepBody from './components/StepBody.vue'
import { ar, de, en } from './locales'

const i18nMessages = { ar, de, en }

export {
  calloutPlugin,
  createCalloutRegistry,
  i18nMessages,
  KrgzHayali,
  StepBody,
}
export type { CalloutDefinition, CalloutRegistry } from './callouts'
export type { Chapter, Lesson, Position, Step } from './types'
