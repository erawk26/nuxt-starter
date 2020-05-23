<template>
  <div>
    <h1>{{ project.title }}</h1>
    <nuxt-content :document="project" />
    <div v-for="item in projects" :key="item.slug">
      <nuxt-link :to="'/projects/' + item.slug">{{ item.title }}</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
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

    return {
      project,
      projects
    }
  }
}
</script>
