<template lang="pug">
  nuxt-link.flip-card.d-flex.flex-wrap.align-start.rel.ar(:to="'/projects/'+project.slug" :class="$vuetify.breakpoint.smAndUp?'seven-five':'square'")
    article
      v-card.card-front.abs-center.eo-flex.col.center(ripple :elevation="hover?5:10")
        v-img.img.flex-grow(:src="require('@/assets/img/'+project.media.img[0].src)")
        .content.la.uc.full-width 
          div {{project.title}}
          small {{project.client}}
      v-card.card-back.abs-center(ripple :elevation="hover?5:10")
        .content.eo-flex.col.a-center.j-start.fill.dk-green.center-text
          | {{project.title}}
          ul.eo-flex.center.wrap.unstyle.cell.omega
            li.skill(v-for="(skill, i) in project.skills")
              v-chip.ma-1(small) {{skill}}
</template>
<script>
import { gsap } from 'gsap'
import Link from '~/components/Link.vue'
export default {
  components: { Link },
  props: {
    // direction: { type: Number, default: 0 },
    hover: { type: Boolean, default: false },
    project: {
      type: Object,
      default: () => ({
        id: null,
        img: null,
        logo: null,
        title: null,
        skills: [],
        links: {
          main: {},
          other: []
        },
        desc: null
      })
    }
  },
  computed: {},
  watch: {
    hover(newVal) {
      if (newVal) {
        this.animation(1)
      } else {
        this.animation(-1)
      }
    }
  },
  mounted() {
    gsap.set(this.$el.querySelector('.card-front'), { rotationY: 0 })
    gsap.set(this.$el.querySelector('.card-back'), { rotationY: -180 })
  },
  methods: {
    animation(dir) {
      const frontRotation = dir > 0 ? 180 : 0
      const backRotation = dir > 0 ? 0 : -180
      gsap.to(this.$el.querySelector('.card-front'), {
        rotationY: frontRotation,
        duration: 1
      })
      gsap.to(this.$el.querySelector('.card-back'), {
        rotationY: backRotation,
        duration: 1
      })
    }
  }
}
</script>
<style lang="scss">
/// FLIP ANIMATION STYLING GOES UNDER HERE ///
.flip-card article {
  .img {
    width: 100%;
    flex: 1 0 calc(100% - 55px);
  }
  overflow: visible;
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  .card-front,
  .card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    &:before {
      position: absolute;
      width: 100%;
      height: 100%;
      content: '';
      top: 0;
      left: 0;
      z-index: 0;
    }
  }
  .card-back .content {
    height: 100%;
  }
}
</style>
