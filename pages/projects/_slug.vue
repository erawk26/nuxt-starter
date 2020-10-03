<template lang="pug">
section.project(:class='$route.params.slug || "index"')
  v-container(grid-list-lg='', v-if='typeof project !== "undefined"')
    v-breadcrumbs.pl-0(:items='crumbs')
      template(v-slot:divider='')
        v-icon mdi-chevron-right
    // full template
    v-layout.project-container.max-pg-width.row.wrap.project--full(
      v-if='$route.params.slug'
    )
      project-full(
        v-if='project && projects',
        :projects='projects',
        :project='project'
      )
        template(slot='below-body')
          nuxt-content(:document='project')
      .full-width.ca
        v-pagination(
          @input='paginationChange',
          :value='index + 1',
          total-visible='5',
          :length='projects.length',
          circle
        )
    // teaser template
    v-layout.row.wrap.cards(v-else)
      h1.mt-0.full-width {{ project.title }}
      v-flex.li(
        v-for='project in projects',
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
// eslint-disable-next-line no-unused-vars

export default {
  head() {
    return {
      title: `EO Portfolio | ${this.meta.title}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.meta.desc
        }
      ]
    }
  },
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
        to: '/'
      },
      {
        exact: true,
        link: true,
        text: 'Projects',
        to: '/projects/'
      }
    ]
    if (slug !== 'index') {
      crumbs.push({
        text: project.client,
        exact: true,
        link: true
      })
    }
    const meta = {
      title: project.title,
      desc: project.description
    }
    return { project, crumbs, meta }
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
