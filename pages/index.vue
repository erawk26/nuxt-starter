<template lang="pug">
  section.intro.d-flex.flex-column.align-center.justify-center
    v-avatar.headshot(:size="$vuetify.breakpoint.xsOnly?'150px':'210px'")
      v-img.img-circle.elevation-4.mb-1(:src="require('~/assets/img/'+page.headshot)" lazy-src="http://via.placeholder.com/500x500" title="Erik Olsen" alt="Erik Olsen")
    v-card.px-5.mx-5.center-text.avatar-padding(:color="'blue-grey ' + $vuetify.theme.dark?'darken-5':'lighten-5'" elevation="6" :max-width="400" :min-width="200")
      nuxt-content(:document="page")
      nuxt-link.material-icons.mx-1.charcoal--text(to="/projects")
        v-icon(large) expand_more
      my-menu.nav-social.menu--social.d-flex.justify-space-between.text-center(:menu="cardMenu" :hide-text='true')
</template>

<script>
export default {
  transition: 'slide-down',
  // return +to.query.page < +from.query.page ? 'slide-up' : 'slide-down'
  components: { MyMenu: () => import('~/components/Menu.vue') },
  data: () => ({}),
  computed: {
    cardMenu() {
      return this.$store.state.menus.footer // .slice(1)
    }
  },
  async asyncData({ $content, params, error }) {
    const page = await $content('index')
      .fetch()
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log({ err, statusCode: 404, message: 'Page not found' })
      })
    return {
      page
    }
  }
}
</script>

<style lang="scss">
section.intro {
  min-height: 75vh;
  .avatar-padding {
    padding-top: 50px;
  }
  .v-btn i {
    margin-right: 0.25em;
  }
  .nav-social a {
    flex: 0;
    i {
      // color: $charcoal;
    }
  }
  .headshot {
    transform: translateY(60px) scaleX(-1) rotate(8deg);
    z-index: 1;
  }
}
</style>
