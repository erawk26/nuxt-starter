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
    onHover(ref, bool) {
      if (bool) {
        this.$refs[ref][0].forward()
      } else {
        this.$refs[ref][0].reverse()
      }
    },
    kebab: (val) =>
      val
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-')
  }
})
