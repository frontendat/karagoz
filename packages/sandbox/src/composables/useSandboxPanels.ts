import { computed, ref, watch, type Ref } from 'vue'

import { type Panel } from '../types'
import { toPanelRecord } from '../utils/toPanelRecord.ts'

/**
 * Main panels: at least one must always be shown, and both may be shown side by side.
 */
const MAIN_PANELS: Panel[] = ['code', 'result']
/**
 * Drawer panels: mutually exclusive, zero or one shown at a time.
 */
const DRAWER_PANELS: Panel[] = ['processes', 'terminal']

/**
 * Composable for the sandbox's panel exclusivity/toggle state machine: which panels are shown,
 * how toggling a panel affects the others, and the drawer's collapse/reopen behaviour.
 */
export const useSandboxPanels = (
  availablePanels: Ref<Panel[]>,
  shownPanels: Ref<Panel[]>,
  multiPanel: Ref<boolean>,
) => {
  const dropDrawerPanels = (shown: Panel[]) =>
    shown.filter((p) => !DRAWER_PANELS.includes(p))

  /**
   * Ensure shownPanels never includes panels that aren't listed in availablePanels.
   */
  watch(
    availablePanels,
    (panels) =>
      (shownPanels.value = shownPanels.value.filter((panel) =>
        panels.includes(panel),
      )),
    { immediate: true },
  )

  /**
   * Resolves conflicting initial `shownPanels`: if both drawer panels are present, the one that
   * appears last in the array wins; if neither main panel is present, force-show `code`.
   */
  const resolveInitialShownPanels = () => {
    const initial = shownPanels.value
    if (DRAWER_PANELS.every((panel) => initial.includes(panel))) {
      const winner = [...initial]
        .reverse()
        .find((panel) => DRAWER_PANELS.includes(panel))
      shownPanels.value = shownPanels.value.filter(
        (panel) => !DRAWER_PANELS.includes(panel) || panel === winner,
      )
    }
    if (!MAIN_PANELS.some((panel) => shownPanels.value.includes(panel))) {
      shownPanels.value = [...shownPanels.value, 'code']
    }
  }
  resolveInitialShownPanels()

  /**
   * Last drawer panel that was shown, so the close icon can reopen it once the drawer is
   * collapsed.
   */
  const lastDrawerPanel = ref<Panel | undefined>(
    DRAWER_PANELS.find((panel) => shownPanels.value.includes(panel)),
  )

  const actualShownPanels = computed(() =>
    multiPanel.value ? shownPanels.value : shownPanels.value.slice(0, 1),
  )

  const togglePanel = (panel: Panel) => {
    if (!multiPanel.value) {
      shownPanels.value = [
        panel,
        ...shownPanels.value.filter(
          (p) =>
            p !== panel &&
            (!DRAWER_PANELS.includes(panel) ||
              !DRAWER_PANELS.filter((dp) => dp !== panel).includes(p)),
        ),
      ]
      return
    }

    if (MAIN_PANELS.includes(panel)) {
      const otherMainPanelShown = MAIN_PANELS.some(
        (p) => p !== panel && shownPanels.value.includes(p),
      )
      // Clicking the toggle for the only currently-shown main panel is a no-op.
      if (shownPanels.value.includes(panel) && !otherMainPanelShown) return
      shownPanels.value = shownPanels.value.includes(panel)
        ? shownPanels.value.filter((p) => p !== panel)
        : [...shownPanels.value, panel]
      return
    }

    // Drawer panels are mutually exclusive: activating one drops the other.
    const withoutDrawerPanels = dropDrawerPanels(shownPanels.value)
    const isCurrentlyShown = shownPanels.value.includes(panel)
    shownPanels.value = isCurrentlyShown
      ? withoutDrawerPanels
      : [...withoutDrawerPanels, panel]
    if (!isCurrentlyShown) lastDrawerPanel.value = panel
  }

  /**
   * Toggles the drawer: collapses it if a drawer panel is shown, otherwise reopens the last
   * shown drawer panel.
   */
  const toggleDrawer = () => {
    if (!lastDrawerPanel.value) return
    const isDrawerShown = DRAWER_PANELS.some((p) =>
      shownPanels.value.includes(p),
    )
    if (isDrawerShown) {
      shownPanels.value = dropDrawerPanels(shownPanels.value)
      return
    }
    togglePanel(lastDrawerPanel.value)
  }

  const isShown = computed(() => toPanelRecord(actualShownPanels.value))

  return {
    actualShownPanels,
    isShown,
    togglePanel,
    toggleDrawer,
  }
}
