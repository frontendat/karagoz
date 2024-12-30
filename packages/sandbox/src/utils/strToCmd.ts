import { ProcessTabContext } from '../types'

/**
 * Convert a string command to a structure that con ben passed to WebContainer.spawn()
 * @param str
 */
export const strToCmd = (str: string): ProcessTabContext => {
  const [command, ...args] = str.split(' ')
  return {
    command,
    args,
  }
}
