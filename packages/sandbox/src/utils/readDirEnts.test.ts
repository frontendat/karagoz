import { describe, expect, it } from 'vitest'

import { createFakeContainer } from '../test-support/fakeContainer.ts'
import { readDirEnts } from './readDirEnts.ts'

describe('readDirEnts', () => {
  it('reads typed entries and puts directories before files', async () => {
    const container = createFakeContainer({
      'zeta.txt': '',
      'src/index.js': '',
      'alpha.txt': '',
      'lib/util.js': '',
    })

    const entries = await readDirEnts(container as never, '.')

    expect(container.fs.readdir).toHaveBeenCalledWith('.', {
      withFileTypes: true,
    })
    expect(entries.map((e) => e.isDirectory())).toEqual([
      true,
      true,
      false,
      false,
    ])
    expect(entries.filter((e) => e.isDirectory()).map((e) => e.name)).toEqual(
      expect.arrayContaining(['src', 'lib']),
    )
  })

  it('returns an empty list for an empty directory', async () => {
    const container = createFakeContainer()

    expect(await readDirEnts(container as never, '.')).toEqual([])
  })
})
