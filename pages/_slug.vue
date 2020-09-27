<template>
  <section :class="$route.params.slug">
    <div v-if="page" class="content">
      <h1>{{ page.title }}</h1>
      <nuxt-content :document="page" />
    </div>
    <loading v-else class="loading" />
  </section>
</template>

<script>
export default {
  head() {
    return {
      title: `EO Portfolio | ${this.meta.title}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.meta.description
        }
      ]
    }
  },
  data() {
    return {
      meta: {
        title: '',
        desc: ''
      },
      page: null,
      pages: this.$store.state.cmsData.pages
    }
  },
  async fetch() {
    const slug = this.$route.params.slug || 'index'
    this.page = await this.$content(slug)
      .fetch()
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log({ err, statusCode: 404, message: 'Page not found' })
      })
    this.meta.title = this.page.title
    this.meta.desc = this.page.description
  }
}
</script>
