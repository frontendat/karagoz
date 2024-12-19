import { ProcessTabContext } from '../types'

export const strToCmd = (str: string): ProcessTabContext => {
  const [command, ...args] = str.split(' ')
  return {
    command,
    args,
  }
}
