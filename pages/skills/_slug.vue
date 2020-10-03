<template lang="pug">
v-container.cards(grid-list-lg='')
  v-breadcrumbs.pl-0(:items='crumbs')
    template(v-slot:divider='')
      v-icon mdi-chevron-right
  v-layout.row.wrap
    h1.mt-0.full-width(v-if='$route.params.slug') Skill: {{ tag }}
    .skills.mt-2.full-width(v-else-if='page', lg12)
      h1.mt-0.full-width {{ page.title }}
      multiselect#skills-options.skills-options(
        :options='skillsOptions()',
        v-model='selected',
        @input='filterNodes',
        multiple,
        close-on-select,
        :clear-on-select='false',
        :preserve-search='true',
        placeholder='Choose Skills',
        label='name',
        track-by='name'
      )
    v-flex.li(
      v-for='project in skilledProjects',
      :key='project.slug',
      xs12='',
      sm6='',
      lg4=''
    )
      project-teaser(
        :ref='project.slug',
        v-hover='{ over: () => onHover(project.slug,true), leave: () => onHover(project.slug,false) }',
        :key='project.slug',
        :project='project',
        xs12='',
        sm6='',
        lg4=''
      )
</template>

<script>
import 'vue-multiselect/dist/vue-multiselect.min.css'
import Multiselect from 'vue-multiselect'
export default {
  head() {
    return {
      title: `EO Portfolio | ${this.tag || 'Skills'}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$route.params.slug
            ? `A list of projects using ${this.tag}`
            : 'All my projects sorted by skill'
        }
      ]
    }
  },
  components: {
    Multiselect,
    ProjectTeaser: () => import('@/components/ProjectTeaser')
  },
  data() {
    return {
      selected: null,
      crumbs: [],
      tag: this.$store.state.cmsData.skills[this.$route.params.slug],
      skills: this.$store.state.cmsData.skills,
      page: null,
      projects: this.$store.state.cmsData.projects,
      skilledProjects: this.$store.state.cmsData.projects.filter((p) =>
        p.skills.includes(
          this.$store.state.cmsData.skills[this.$route.params.slug]
        )
      )
    }
  },
  async fetch() {
    const slug = this.$route.params.slug
    if (!slug) {
      // if no slug in defined
      this.skilledProjects = this.projects
      this.page = await this.$content('skills')
        .fetch()
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log({ err, statusCode: 404, message: 'Page not found' })
        })
    }
    this.crumbs = [
      {
        text: 'Home',
        disabled: false,
        to: '/'
      },
      {
        text: 'Skills',
        disabled: false,
        to: '/skills'
      },
      {
        text: !slug ? 'By Skill' : this.tag,
        disabled: true
      }
    ]
  },
  methods: {
    getSelectedNames() {
      return this.selected.length > 0 ? this.selected.map((o) => o.name) : []
    },
    filterNodes(options) {
      options = options.map((o) => o.value)
      this.skilledProjects =
        options.length > 0
          ? this.projects.filter((p) =>
              p.skills.some((skill) => options.includes(this.kebab(skill)))
            )
          : this.projects
    },
    skillsOptions() {
      return Object.keys(this.skills).map((key) => ({
        name: this.skills[key],
        value: key
      }))
    }
  }
}
</script>
<style lang="scss">
.skills-options .multiselect__content {
  padding-left: 0;
  .multiselect__element {
    margin-top: 0;
    margin-bottom: 0;
  }
}
</style>
