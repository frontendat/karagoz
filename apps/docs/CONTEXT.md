# Docs

The karagoz.dev site: landing page, guides, and API reference for the Karagöz packages, published in English, German and Arabic.

## Language

### Localisation

**Locale**:
One of the languages the site is published in: `en` (default), `de`, `ar`.
_Avoid_: Language version, region

**Default Locale**:
English (`en`), the locale every page is authored in first and the source of truth for all translations.
_Avoid_: Base language, master locale

**Source Page**:
A page in the default locale.
_Avoid_: Original, master page

**Translated Page**:
A page in a non-default locale that mirrors a Source Page at the same relative path.
_Avoid_: Copy, localized version, counterpart

**Locale Fallback**:
Showing the Source Page when a locale has no Translated Page for the requested path.
_Avoid_: Default page, missing translation page

**Generated Page**:
A page built from code comments (the API reference) rather than written by hand; it exists only in the Default Locale and is reached in other locales via Locale Fallback.
_Avoid_: Auto docs, typedoc page

### Translation conventions

**Reader Address**:
How a page speaks to the reader. German uses informal "du", never "Sie". Arabic (Modern Standard) prefers impersonal phrasing, falling back to masculine singular.
_Avoid_: Tone, formality

**Untranslated Term**:
A name kept in English across all locales: product names (Karagöz Sandbox, Karagöz Puppeteer), code identifiers, WebContainer. German also keeps common developer loanwords (Panel, Tab, Props, Events); Arabic translates such concepts and gives the English term in parentheses on first use per page.
_Avoid_: Keyword, jargon
