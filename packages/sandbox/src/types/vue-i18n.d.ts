import { en } from '../locales'

type MessageSchema = typeof en

/**
 * Provide type intellisense for translation keys and date/number formats.
 */
declare module 'vue-i18n' {
  // define the locale messages schema
  export interface DefineLocaleMessage extends MessageSchema {}
}
