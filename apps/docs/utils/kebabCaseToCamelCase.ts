export const kebabCaseToCamelCase = (str: string) =>
  str.replaceAll(/(-+)([a-z])/g, (_, __, char) => char.toUpperCase())
