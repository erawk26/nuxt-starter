<template lang="pug">
.max-pg-width.full-width
  .mobile-only(v-if='!$vuetify.breakpoint.smAndUp')
    v-icon.toggle-menu(@click='drawer = !drawer') mdi-menu
    .fixed
      v-navigation-drawer(v-model='drawer')
        my-menu.nav-main.menu--main.eo-flex.col.inline.a-start.j-start(
          type='mobile',
          :menu='$store.state.menus.main'
        )
        my-menu.nav-footer.menu--footer.d-flex.justify-start(
          :menu='$store.state.menus.footer.slice(1)',
          hide-text,
          type='flat'
        )
  my-menu.nav-main.menu--main.eo-flex.inline.a-start.j-start(
    type='flat',
    v-if='$vuetify.breakpoint.smAndUp',
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
  .nav-footer {
    padding: 0 12px 0 22px;
    font-size: 8em;
    justify-content: center;
    a.nav-item.v-list-item--link {
      padding: 0 7px;
      justify-content: center;
      flex: 0;
      .v-list-item__action.no-text {
        margin: 0;
        text-align: center;
      }
      .v-icon {
        font-size: 18px;
      }
    }
  }
}
.mobile-only a {
  display: flex;
  align-items: center;
}
</style>
