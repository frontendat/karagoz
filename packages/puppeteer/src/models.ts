export const krgzTopicTypes = {
  MainTopic: 'main',
  SubTopic: 'sub',
} as const

export type KrgzTopicTypeKey = keyof typeof krgzTopicTypes

export type KrgzTopicType = (typeof krgzTopicTypes)[KrgzTopicTypeKey]

export type KrgzSlide = {
  explanation: string
  files: KrgzSlideFile[]
}

export type KrgzSlideFile = {
  code: string
  highlightedLines?: (number | [number, number])[]
  isHidden?: boolean
  isReadonly?: boolean
  path: string
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
