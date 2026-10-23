import './style.css'

import { calloutPlugin, createCalloutRegistry } from './callouts'
import KrgzHayali from './components/KrgzHayali.vue'
import StepBody from './components/StepBody.vue'
import { i18nMessages } from './locales'
import { validateLesson } from './validateLesson'

export {
  calloutPlugin,
  createCalloutRegistry,
  i18nMessages,
  KrgzHayali,
  StepBody,
  validateLesson,
}
export type { CalloutDefinition, CalloutRegistry } from './callouts'
export type { FullLayoutFrom } from './layout/breakpoints'
export type {
  AdjustmentsTree,
  Chapter,
  EditorDirective,
  Lesson,
  LineSpec,
  PathPattern,
  Position,
  Step,
} from './types'
export type { LessonIssue, LessonIssueRule } from './validateLesson'
