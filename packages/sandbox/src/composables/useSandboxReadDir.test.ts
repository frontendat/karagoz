import { afterEach, describe, expect, it, vi } from 'vitest'
import { nextTick, ref } from 'vue'

import {
  createFakeContainer,
  type FakeContainer,
  mountWithContainer,
} from '../test-support/fakeContainer.ts'
import { useSandbox } from './useSandbox.ts'
import { useSandboxReadDir } from './useSandboxReadDir.ts'

vi.mock('@webcontainer/api', () => ({
  WebContainer: { boot: vi.fn() },
  reloadPreview: vi.fn(),
}))

let unmount: () => void
afterEach(() => unmount())

const setup = async (
  files: Record<string, string>,
  path: string | undefined = '.',
) => {
  const container: FakeContainer = createFakeContainer(files)
  const pathRef = ref(path)
  const { result, wrapper } = mountWithContainer(() => {
    const sandbox = useSandbox()
    return { sandbox, readDir: useSandboxReadDir(pathRef) }
  }, container)
  unmount = () => wrapper.unmount()
  await vi.waitFor(() => expect(result.sandbox.container.value).toBe(container))
  return { container, pathRef, dirEnts: result.readDir.dirEnts }
}

const names = (dirEnts: { value: { name: string }[] }) =>
  dirEnts.value.map(({ name }) => name)

describe('useSandboxReadDir', () => {
  it('lists the directory, directories first', async () => {
    const { dirEnts } = await setup({
      'b.txt': '',
      'src/index.js': '',
      'a.txt': '',
    })

    await vi.waitFor(() => expect(dirEnts.value).toHaveLength(3))
    expect(names(dirEnts)[0]).toBe('src')
  })

  it('lists only the entries of the requested path', async () => {
    const { dirEnts } = await setup(
      { 'a.txt': '', 'src/index.js': '', 'src/util.js': '' },
      'src',
    )

    await vi.waitFor(() => expect(dirEnts.value).toHaveLength(2))
    expect(names(dirEnts).sort()).toEqual(['index.js', 'util.js'])
  })

  it('re-reads the directory when something changes in it', async () => {
    const { container, dirEnts } = await setup({ 'a.txt': '' })
    await vi.waitFor(() => expect(dirEnts.value).toHaveLength(1))

    await container.fs.writeFile('new.txt', 'x')

    await vi.waitFor(() => expect(dirEnts.value).toHaveLength(2))
  })

  it('reads the new path and closes the old watcher when the path changes', async () => {
    const { container, pathRef, dirEnts } = await setup({
      'a.txt': '',
      'src/index.js': '',
    })
    await vi.waitFor(() => expect(dirEnts.value).toHaveLength(2))
    const oldWatcher = container.fs.watch.mock.results[0].value

    pathRef.value = 'src'
    await nextTick()

    await vi.waitFor(() => expect(names(dirEnts)).toEqual(['index.js']))
    expect(oldWatcher.close).toHaveBeenCalled()
    expect(container.fs.watch).toHaveBeenLastCalledWith(
      'src',
      expect.any(Function),
    )
  })
})
