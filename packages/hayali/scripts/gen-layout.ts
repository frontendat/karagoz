import { writeFileSync } from 'node:fs'

import { layoutCss } from '../src/layout/layoutCss.ts'

writeFileSync(new URL('../src/layout.css', import.meta.url), layoutCss())
