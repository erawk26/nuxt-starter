<template lang="pug">
  section(:class="$route.params.slug||'index'" class="project")
    v-container(grid-list-lg='' v-if="project")
      v-breadcrumbs.pl-0(:items='crumbs')
        template(v-slot:divider='')
          v-icon mdi-chevron-right
      v-layout.project-container.max-pg-width.row.wrap.project--full(v-if="$route.path!=='/projects'")
        project-full(v-if="project" :projects='projects' :project='project')
          template(slot="body")
            nuxt-content(:document="project")
        .full-width.ca
          v-pagination(@input="paginationChange" :value="index+1" total-visible="5" :length='projects.length' circle)
      v-layout.row.wrap.cards(v-else)
        h1.mt-0.full-width {{project.title}}
        v-flex.li(v-for='project in projects' :key='project.slug' xs12='' sm6='' lg4='')
          project-teaser(:ref="project.slug" v-hover="{ over: () => onHover(project.slug,true), leave: () => onHover(project.slug,false) }" :key="project.slug" :project="project" xs12='' sm6='' lg4='')
</template>

<script>
// eslint-disable-next-line no-unused-vars

export default {
  components: {
    ProjectTeaser: () => import('@/components/ProjectTeaser'),
    ProjectFull: () => import('@/components/ProjectFull')
  },
  data() {
    return {
      skills: this.$store.state.cmsData.skills,
      projects: this.$store.state.cmsData.projects,
      index: this.$store.state.cmsData.projects
        .map((x) => x.slug)
        .indexOf(this.$route.params.slug)
    }
  },
  computed: {},
  async asyncData({ $content, params, error }) {
    const slug = params.slug || 'index'
    const project = await $content('projects', slug)
      .fetch()
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log({ err, statusCode: 404, message: 'Page not found' })
      })
    const crumbs = [
      {
        text: 'Home',
        disabled: false,
        href: '/'
      },
      {
        text: 'Projects',
        disabled: false,
        href: '/projects'
      },
      {
        text: slug === 'index' ? 'All' : project.client,
        disabled: true
      }
    ]
    return { project, crumbs }
  },
  methods: {
    paginationChange(num) {
      this.$router.push({
        path: '/projects/' + this.projects[num - 1].slug
      })
    }
  }
}
</script>
