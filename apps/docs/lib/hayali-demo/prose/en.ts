import type { DemoProse } from './types'

export const en: DemoProse = {
  chapters: {
    basics: 'The page',
    pages: 'More pages',
  },
  steps: {
    markup: {
      title: 'Markup',
      body: `Every page starts as HTML. \`index.html\` is open in the editor: a heading, a paragraph with a counter and a button.

:::tip Lessons guide your attention
This step *opened* \`index.html\` for you. Steps can also close tabs, highlight lines and jump to a line.
:::

The stylesheet and the script are linked, but still empty. The next steps fill them in.`,
    },
    style: {
      title: 'Style',
      body: `\`style.css\` now has rules for \`body\`, \`main\` and \`button\`. The highlighted lines are the ones this step is about.

:::note index.html is locked
Look at the notice above: \`index.html\` is *locked* in this step. You can still open and read it, you just cannot edit it.
:::

Edit the CSS freely. Moving to another step resets your changes, after asking you first.`,
    },
    behaviour: {
      title: 'Behaviour',
      body: `\`app.js\` adds a click handler to the button. The editor jumped straight to line 6, where the handler starts, and the
\`style.css\` tab was closed for you.

Click the button in the preview to see the counter go up.`,
    },
    about: {
      title: 'A second page',
      body: `This step adds \`about.html\` and points the **preview** at it with \`preview.url\`, so you see the page the step is about.

The page is only here for this lesson step: it exists in this step and the next one removes it again.

:::warning Edits are reset
Changes you make are thrown away when you move to another step. Hayali asks for confirmation before it does.
:::`,
    },
    cleanup: {
      title: 'Cleaning up',
      body: `\`about.html\` is gone again. Its editor tab closed by itself, and because the preview was left on a page that no longer
exists, it went back to \`/\`.

This step also used \`close: 'all'\` to close every tab before opening \`index.html\` again. That is the whole lesson format.`,
    },
  },
}
