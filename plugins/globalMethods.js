import Vue from 'vue'
Vue.mixin({
  methods: {
    looper(arr, index, dir = 1) {
      // loop through the pages
      const len = arr.length
      return (index + (dir % len) + len) % len
    },

    debounce(func, wait, immediate) {
      let timeout
      return function() {
        const context = this
        const args = arguments
        const later = function() {
          timeout = null
          if (!immediate) func.apply(context, args)
        }
        const callNow = immediate && !timeout
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
        if (callNow) func.apply(context, args)
      }
    },
    getMediaBind(data) {
      const obj = {
        lazyUrl: data.lazyUrl || null,
        ytId: data.ytId || null,
        sources: [],
        type: data.type,
        alt: data.type + ' of ' + this.project.title,
        aspectRatio: 1.77,
        title: data.type + ' of ' + this.project.title
      }
      if (data.type === 'video') {
        obj.sources = data.sources.map((file) =>
          require(`~/assets/video/${file}`)
        )
        if (data.poster) {
          obj.poster = `~/assets/video/${data.poster}`
        }
      }
      if (data.src) {
        obj.src = require(`~/assets/img/${data.src}`)
      }
      return obj
    },
    onHover(ref, bool) {
      if (bool) {
        this.$refs[ref][0].enter()
      } else {
        this.$refs[ref][0].exit()
      }
    },
    kebab: (val) =>
      val
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-')
  }
})
