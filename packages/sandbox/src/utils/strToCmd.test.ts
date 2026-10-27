import { describe, expect, it } from 'vitest'

import { strToCmd } from './strToCmd.ts'

describe('strToCmd', () => {
  it('splits the command from its arguments', () => {
    expect(strToCmd('npm install --save vue')).toEqual({
      command: 'npm',
      args: ['install', '--save', 'vue'],
    })
  })

  it('returns no arguments for a bare command', () => {
    expect(strToCmd('jsh')).toEqual({ command: 'jsh', args: [] })
  })
})
