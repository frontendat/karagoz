import { FileSystemTree } from '@webcontainer/api'

export const krgzTopicTypes = {
  MainTopic: 'main',
  SubTopic: 'sub',
} as const

export type KrgzTopicTypeKey = keyof typeof krgzTopicTypes

export type KrgzTopicType = (typeof krgzTopicTypes)[KrgzTopicTypeKey]

export type KrgzSlide = {
  explanation: string
  tree: FileSystemTree
}

export type KrgzTopic = {
  slides: KrgzSlide[]
  subject: string
  type: KrgzTopicType
}

export type KrgzStory = {
  subject: string
  topics: KrgzTopic[]
}
