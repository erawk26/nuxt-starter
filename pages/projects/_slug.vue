<template lang="pug">
  div
    v-breadcrumbs.pl-0(:items='crumbs')
      template(v-slot:divider='')
        v-icon mdi-chevron-right
    div(v-if="$route.path!=='/projects'")
      project-full(:projects='projects' :project='project')
        template(slot="body")
          nuxt-content(:document="project")
      .text-center
        v-pagination(@input="paginationChange" v-model='projectNum' total-visible="5" :length='projects.length' circle)
    v-container.cards(v-else grid-list-lg='')
      v-layout.row.wrap
        v-flex.li(v-for='project in projects' :key='project.slug' xs12='' sm6='' lg4='')
          v-hover
            template(v-slot='{ hover }')
              project-teaser(:key="project.slug" :hover='hover' :project="project" xs12='' sm6='' lg4='')
</template>

<script>
import ProjectTeaser from '@/components/ProjectTeaser'
import ProjectFull from '@/components/ProjectFull'
export default {
  components: { ProjectTeaser, ProjectFull },
  computed: {},
  async asyncData({ $content, params, error }) {
    const slug = params.slug || 'index'
    const project = await $content('projects', slug)
      .fetch()
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log({ err, statusCode: 404, message: 'Page not found' })
      })
    const projects = await $content('projects')
      // .only(['path'])
      .where({ slug: { $ne: 'index' } })
      .sortBy('title')
      .fetch()
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log({ err, statusCode: 404, message: 'Page not found' })
      })
    const skills = projects.reduce((skillsObj, currentProject) => {
      const kebab = (val) =>
        val
          .toLowerCase()
          .replace(/[^\w ]+/g, '')
          .replace(/ +/g, '-')
      currentProject.skills.forEach((skill) => {
        if (!(kebab(skill) in skillsObj)) {
          skillsObj[kebab(skill)] = skill
        }
      })
      return skillsObj
    }, {})
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
        text: project.title,
        disabled: true,
        href: '/projects/' + params.slug
      }
    ]
    const index = projects.map((x) => x.slug).indexOf(params.slug)
    const projectNum = index !== -1 ? index + 1 : 1
    return { skills, project, projects, crumbs, projectNum }
  },
  methods: {
    paginationChange(num) {
      console.log('/projects/' + this.projects[num - 1].slug)
      this.$router.push({
        path: '/projects/' + this.projects[num - 1].slug
      })
    }
  }
}
</script>
