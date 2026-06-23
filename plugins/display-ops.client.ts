/**
 * plugins/display-ops.client.ts
 *
 * Side-effect-only Nuxt plugin that boots the display's connection
 * to the Supabase operations center. The three modules auto-start
 * on import (see the side-effect block at the bottom of each), so
 * this plugin's job is just to force the modules to be bundled
 * and to surface their state to the rest of the app.
 *
 * The .client.ts suffix means this plugin only runs in the browser
 * (never during prerender), so it doesn't break `nitro.preset =
 * 'static'`.
 */
import { useDisplayHeartbeat } from '~/composables/useDisplayHeartbeat'
import { useCommandListener } from '~/composables/useCommandListener'
import { startSecurityMonitor } from '~/lib/securityMonitor'

export default defineNuxtPlugin({
  name: 'nu-display-ops',
  enforce: 'pre',
  parallel: false,
  setup() {
    // Calling the composables triggers the auto-start side effects
    // that the modules run on import. We capture the returned state
    // so Nuxt's plugin system can prove these modules were executed
    // (Vite/Rollup cannot tree-shake a runtime call to a module's
    // exported function).
    const heartbeat = useDisplayHeartbeat()
    const listener = useCommandListener()
    startSecurityMonitor()

    if (typeof window !== 'undefined') {
      const w = window as {
        __nuDisplayOps?: {
          heartbeat: { lastSentAt: string | null; sent: number; isActive: boolean }
          listener: { status: string; receivedCount: number; lastAckId: string | null }
        }
      }
      w.__nuDisplayOps = {
        heartbeat: {
          lastSentAt: heartbeat.lastSentAt.value,
          sent: heartbeat.sent.value,
          isActive: heartbeat.isActive.value,
        },
        listener: {
          status: listener.status.value,
          receivedCount: listener.receivedCount.value,
          lastAckId: listener.lastAckId.value,
        },
      }
    }
  },
})
