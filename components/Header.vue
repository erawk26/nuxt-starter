<template lang="pug">
  my-menu.nav-main.menu--main.eo-flex.j-start(type="flat" :menu="$store.state.menus.main" hide-icon :parentState="isMini")
</template>

<script>
import MyMenu from '~/components/Menu'
export default {
  name: 'AppHeader',
  components: { MyMenu },
  data: () => ({ loading: true, isMini: true }),
  computed: {},
  watch: {
    isMini() {}
  },
  async asyncData({ $content, params, error }) {
    const menus = await $content()
      .only(['path'])
      .fetch()
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log({ err, statusCode: 404, message: 'Page not found' })
      })
    return {
      menus
    }
  },
  mounted() {
    this.loading = false
  },
  methods: {}
}
</script>

<style lang="scss"></style>
