export const fallbackTitleKey = (path: string | string[]) => {
  const actualPath = typeof path === 'string' ? path : path.join('.')
  return `pages${kebabCaseToCamelCase(actualPath.replaceAll('/', '.'))}.title`
}
