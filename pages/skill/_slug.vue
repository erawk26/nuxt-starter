<template>
  <div>
    <h1>{{ name }}</h1>
    <div v-for="(item, key) in skilledProjects" :key="key">
      <nuxt-link :to="'/projects/' + item.slug">{{ item.title }}</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      skills: [],
      projects: [],
      skilledProjects: []
    }
  },
  computed: {
    name() {
      return this.skills[this.$route.params.slug]
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
    this.skilledProjects = this.projects.filter((p) =>
      p.skills.includes(this.skills[this.$route.params.slug])
    )
  },
  methods: {}
}
</script>
