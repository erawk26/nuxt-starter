<template lang="pug">
  figure.media.full-width.full-height(:class="type")
    v-img(v-if="type=='img'" :aspect-ratio="aspectRatio" :alt="alt||title" :title="title||alt" :lazy-src="lazyUrl" :src="src")
    video(v-if="type=='video'" autoplay="autoplay" loop="loop" muted="muted" playsinline="playsinline" width="auto" height="auto" :poster="poster" :title="title" :style="{minHeight:'100%',minWidth:'100%'}")
      source(:src="src" type="video/mp4")
</template>
<script>
export default {
  name: 'Media',
  props: {
    src: { type: String, default: null },
    poster: { type: String, default: null },
    lazyUrl: { type: String, default: null },
    type: { type: String, default: 'img' },
    alt: { type: String, default: null },
    aspectRatio: { type: Number, default: null },
    title: { type: String, default: null }
  },
  data() {
    return {
      loading: true
    }
  },
  computed: {},
  watch: {},
  mounted() {
    this.checkMedia(this.type)
    // console.log("Media Type " + this.mediaType + " mounted.");
  },
  beforeUpdate() {
    this.loading = true
    // console.log("Media Type " + this.mediaType + " is about to update");
  },
  updated() {
    this.checkMedia(this.type)
    // console.log("Media Type " + this.mediaType + " updated.");
  },
  methods: {
    checkMedia(type) {
      const media = this.$el.querySelector('.media ' + type)
      if (media && type === 'video') {
        media.addEventListener('canplaythrough', this.onMediaLoad)
      }
      if (media && type === 'img') {
        media.addEventListener('load', this.onMediaLoad)
      }
    },
    onMediaLoad(evt) {
      const media = this.$el.querySelector('.media ' + this.type)
      this.loading = false
      // console.log("ExploreMedia: loaded " + this.mediaType);
      this.$emit('loaded', evt)
      media.removeEventListener(
        this.type === 'video' ? 'canplaythrough' : 'onload', // the event type
        this.onMediaLoad, // the function
        false // useCapture
      )
    }
  }
}
</script>
