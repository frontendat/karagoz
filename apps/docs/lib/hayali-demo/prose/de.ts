import type { DemoProse } from './types'

export const de: DemoProse = {
  chapters: {
    basics: 'Die Seite',
    pages: 'Weitere Seiten',
  },
  steps: {
    markup: {
      title: 'Markup',
      body: `Jede Seite beginnt als HTML. \`index.html\` ist im Editor geöffnet: eine Überschrift, ein Absatz mit einem Zähler und ein Button.

:::tip Lektionen lenken deine Aufmerksamkeit
Dieser Schritt hat \`index.html\` für dich *geöffnet*. Schritte können auch Tabs schließen, Zeilen hervorheben und zu einer Zeile springen.
:::

Das Stylesheet und das Skript sind eingebunden, aber noch leer. Die nächsten Schritte füllen sie.`,
    },
    style: {
      title: 'Style',
      body: `\`style.css\` enthält jetzt Regeln für \`body\`, \`main\` und \`button\`. Die hervorgehobenen Zeilen sind die, um die es in diesem Schritt geht.

:::note index.html ist gesperrt
Beachte den Sperr-Hinweis in diesem Schritt: \`index.html\` ist *gesperrt*. Du kannst sie weiterhin öffnen und lesen, aber nicht bearbeiten.
:::

Bearbeite das CSS frei. Beim Wechsel zu einem anderen Schritt werden deine Änderungen zurückgesetzt, nachdem du gefragt wurdest.`,
    },
    behaviour: {
      title: 'Verhalten',
      body: `\`app.js\` fügt dem Button einen Klick-Handler hinzu. Der Editor ist direkt zu Zeile 6 gesprungen, wo der Handler beginnt, und der
Tab \`style.css\` wurde für dich geschlossen.

Klicke in der Vorschau auf den Button und sieh zu, wie der Zähler steigt.`,
    },
    about: {
      title: 'Eine zweite Seite',
      body: `Dieser Schritt fügt \`about.html\` hinzu und richtet die **Vorschau** mit \`preview.url\` darauf aus, damit du die Seite siehst, um die es im Schritt geht.

Die Seite gibt es nur für diesen Lektionsschritt: Sie existiert in diesem Schritt, und der nächste entfernt sie wieder.

:::warning Änderungen werden zurückgesetzt
Änderungen, die du machst, gehen verloren, wenn du zu einem anderen Schritt wechselst. Hayali fragt vorher nach einer Bestätigung.
:::`,
    },
    cleanup: {
      title: 'Aufräumen',
      body: `\`about.html\` ist wieder weg. Der Editor-Tab hat sich von selbst geschlossen, und weil die Vorschau auf einer Seite stehen geblieben wäre, die
es nicht mehr gibt, ist sie zu \`/\` zurückgekehrt.

Dieser Schritt hat außerdem \`close: 'all'\` benutzt, um alle Tabs zu schließen, bevor \`index.html\` erneut geöffnet wurde. Das ist das ganze Lektionsformat.`,
    },
  },
}
