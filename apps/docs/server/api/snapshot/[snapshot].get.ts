import { snapshot } from '@webcontainer/snapshot'
import { defineEventHandler } from 'h3'

const snapshots = ['express', 'express-solve']

export default defineEventHandler(async (event) => {
  const snapshotName = getRouterParam(event, 'snapshot')

  if (snapshotName && !snapshots.includes(snapshotName)) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Snapshot not found',
    })
  }

  try {
    const sourceSnapshot = await snapshot(`./server/snapshots/${snapshotName}`)
    event.headers.set('content-type', 'application/octet-stream')
    return sourceSnapshot
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Unable to get snapshot',
    })
  }
})
