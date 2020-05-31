<template lang="pug">
    v-container
      v-card
        v-img(:src="require('~/assets/img/'+project.media.img[0].src)" aspect-ratio="1.77" :title="project.title" :alt="project.title")
      .title-wrapper.d-flex.align-end.justify-space-between
        .cell.eo-flex.a-center
          h1.display-2 {{ project.title }}
          template(v-for="link in project.links" )
            my-link.ml-2(:text="link.text" :icon="link.icon||'mdi-link'" :href="link.href" :target="link.target" :title="link.title" hideText)
        small.counter.flex-shrink-0 {{active + 1}} / {{keys.length}}
          nuxt-link(:to="keys[looper(projects,active,1)]" :key="active")
            v-icon chevron_right
      h6.client.mb-3 {{project.client}}
      v-divider
      .eo-flex.wrap.j-center.a-start
          .cell.alpha.mt-2
              slot(name="body")
          .cell.omega.eo-flex.wrap.skills.mt-2(v-if="project.skills")
              small.full-width Skills:
              v-chip.mr-1.mb-1(small :to="'/skill/'+ kebab(skill)" ripple v-for="(skill, i) in project.skills" :key="'skill-'+i+1") {{skill}}
    
</template>

<script>
export default {
  components: { MyLink: () => import('~/components/Link') },
  props: {
    project: {
      type: Object,
      default: () => {}
    },
    projects: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      keys: this.projects.map((x) => x.slug),
      active: this.projects.map((x) => x.slug).indexOf(this.project.slug)
    }
  }
}
</script>

<style lang="scss" scoped>
.skills {
  a {
    display: block;
    font-size: 0.8em;
  }
  h6 {
    width: 100%;
  }
}
.title-wrapper {
  margin-top: 2.5rem;
  h1.display-2 {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
  }
}
.v-card {
  width: 100%;
}
.v-btn i {
  margin-right: 0.25em;
}
// @include set-max-width;
.cell {
  // padding: 5px;
}
.alpha {
  flex: 2;
  margin-right: 2rem;
  @media (max-width: 599px) {
    min-width: 100%;
    margin-right: 0;
  }
}
.omega {
  flex: 1;
}
</style>
