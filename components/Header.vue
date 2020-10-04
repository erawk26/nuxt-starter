<template lang="pug">
.max-pg-width.full-width
  .mobile-only(v-if='$vuetify.breakpoint.smAndDown')
    v-icon.toggle-menu(@click='drawer = !drawer') mdi-menu
    .fixed
      v-navigation-drawer(v-model='drawer')
        my-menu.nav-main.menu--main.eo-flex.col.inline.a-start.j-start(
          type='mobile',
          :menu='$store.state.menus.main'
        )
  my-menu.nav-main.menu--main.eo-flex.inline.a-start.j-start(
    type='flat',
    v-if='!$vuetify.breakpoint.smAndDown',
    :menu='$store.state.menus.main',
    hide-icon
  )
</template>

<script>
import MyMenu from '~/components/Menu'
export default {
  name: 'AppHeader',
  components: { MyMenu },
  data: () => ({ loading: true, drawer: false }),
  computed: {},
  watch: {
    isMini() {}
  },
  mounted() {
    this.loading = false
  },
  methods: {}
}
</script>

<style lang="scss">
.fixed {
  position: fixed;
  // z-index: 100;
}
.mobile-only a {
  display: flex;
  align-items: center;
}
</style>
