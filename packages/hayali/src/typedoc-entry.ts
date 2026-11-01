// Entry point for the generated API reference (`pnpm docs`); keeps the Vue components out of typedoc's way.
export { calloutPlugin, createCalloutRegistry } from './callouts'
export type { CalloutDefinition, CalloutRegistry } from './callouts'
export { i18nMessages } from './locales'
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
export { validateLesson } from './validateLesson'
export type { LessonIssue, LessonIssueRule } from './validateLesson'
// The Vue-free `@karagoz/hayali/parse` entry.
export { parseLesson } from './parse'
export type {
  ParseIssue,
  ParseIssueRule,
  ParseLessonOptions,
  ParseLessonResult,
} from './parse'
