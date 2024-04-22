export const karagozTopicTypes = {
  MainTopic: 'main',
  SubTopic: 'sub',
} as const

export type KaragozTopicTypeKey = keyof typeof karagozTopicTypes

export type KaragozTopicType = (typeof karagozTopicTypes)[KaragozTopicTypeKey]

export type KaragozSlide = {
  code: string
  explanation: string
}

export type KaragozTopic = {
  slides: KaragozSlide[]
  subject: string
  type: KaragozTopicType
}

export type KaragozStory = {
  subject: string
  topics: KaragozTopic[]
}
