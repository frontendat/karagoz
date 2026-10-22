import './style.css'

import { calloutPlugin, createCalloutRegistry } from './callouts'
import KrgzHayali from './components/KrgzHayali.vue'
import StepBody from './components/StepBody.vue'
import { ar, de, en } from './locales'
import { validateLesson } from './validateLesson'

const i18nMessages = { ar, de, en }

export {
  calloutPlugin,
  createCalloutRegistry,
  i18nMessages,
  KrgzHayali,
  StepBody,
  validateLesson,
}
export type { CalloutDefinition, CalloutRegistry } from './callouts'
export type { FullLayoutFrom } from './composables/useFullLayout'
export type {
  Chapter,
  EditorDirective,
  Lesson,
  LineSpec,
  Position,
  Step,
} from './types'
export type { LessonIssue, LessonIssueRule } from './validateLesson'
