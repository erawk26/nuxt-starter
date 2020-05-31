<template lang="pug">
  v-container.cards(grid-list-lg='')
    v-breadcrumbs.pl-0(:items='crumbs')
      template(v-slot:divider='')
        v-icon mdi-chevron-right
    v-layout.row.wrap(v-if="tag")
      h1.mt-0.full-width {{tag}}
      v-flex.li(v-for='project in skilledProjects' :key='project.slug' xs12='' sm6='' lg4='')
        v-hover
          template(v-slot='{ hover }')
            project-teaser(:key="project.slug" :hover='hover' :project="project" xs12='' sm6='' lg4='')
    .eo-flex.wrap.skills.mt-2(v-else)
      h1.mt-0.full-width My Skills
      v-btn.pa-5.mr-1.mb-1(:to="'/skill/'+ kebab(skill)" ripple v-for="(skill, i) in skills" :key="'skill-'+i+1") {{skill}}
</template>

<script>
export default {
  components: {
    ProjectTeaser: () => import('@/components/ProjectTeaser')
  },
  data() {
    return {
      crumbs: [],
      tag: null,
      skills: [],
      projects: [],
      skilledProjects: []
    }
  },
  async fetch() {
    this.projects = await this.$content('projects')
      // .only(['path'])
      .where({ slug: { $ne: 'index' } })
      .sortBy('title')
      .fetch()
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log({ err, statusCode: 404, message: 'Page not found' })
      })
    this.skills = this.projects.reduce((skillsObj, currentProject) => {
      currentProject.skills.forEach((skill) => {
        if (!(this.kebab(skill) in skillsObj)) {
          skillsObj[this.kebab(skill)] = skill
        }
      })
      return skillsObj
    }, {})
    this.tag = this.skills[this.$route.params.slug]
    this.skilledProjects = this.projects.filter((p) =>
      p.skills.includes(this.tag)
    )
    this.crumbs = [
      {
        text: 'Home',
        disabled: false,
        href: '/'
      },
      {
        text: 'Skill',
        disabled: false,
        href: '/skill'
      },
      {
        text: this.tag,
        disabled: true
      }
    ]
  },
  methods: {}
}
</script>
