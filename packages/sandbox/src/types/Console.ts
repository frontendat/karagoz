/**
 * A single log message forwarded from the preview iframe.
 */
export type ConsoleLogEntry = {
  /**
   * Stringified arguments passed to the `console` call (or the error message for uncaught errors).
   */
  args: string[]
  /**
   * Console method used, or `error` for uncaught errors.
   */
  level: 'debug' | 'error' | 'info' | 'log' | 'warn'
}
