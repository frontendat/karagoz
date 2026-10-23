export interface DocsNavLink {
  /** Content path without the locale prefix. */
  path: string
  /** i18n key of the label. */
  label: string
}

export interface DocsNavSection {
  id: string
  /** Content path of the section's landing page. */
  base: string
  /** i18n key of the section name. */
  label: string
  /** i18n key of the short description. */
  teaser: string
  links: DocsNavLink[]
}

const prefix = 'layouts.default.topBar.nav'

const section = (id: string): DocsNavSection => {
  return {
    id,
    base: `/${id}`,
    label: `${prefix}.${id}`,
    teaser: `${prefix}.${id}Teaser`,
    links: [
      { path: `/${id}/setup`, label: `${prefix}.${id}Setup` },
      {
        path: `/${id}/getting-started`,
        label: `${prefix}.${id}GettingStarted`,
      },
      { path: `/${id}/handbook`, label: `${prefix}.${id}Handbook` },
      { path: `/${id}/api-reference`, label: `${prefix}.${id}ApiReference` },
    ],
  }
}

/** The documentation sections shown in the top bar's menus (desktop) and in the navigation drawer (mobile). */
export const docsNavSections: DocsNavSection[] = [
  section('sandbox'),
  section('hayali'),
]
