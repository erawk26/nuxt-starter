/* eslint-disable no-console */
export default function({ store }) {
  // Only in development
  if (process.dev) {
    window.onNuxtReady(($nuxt) => {
      $nuxt.$on('content:update', ({ event, path }) => {
        // Refresh the store categories
        console.log(event, store, path)
        // store.dispatch('SET_STATE',store.menus,)
      })
    })
  }
}
