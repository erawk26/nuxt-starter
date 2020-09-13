<template>
  <span class="abs-center full-height full-width">
    <transition name="fade">
      <v-img
        v-if="loading || (!playerVars.loop && ended)"
        :src="poster"
        class="poster"
        max-width="100%"
        max-height="100%"
        background-position="center"
      ></v-img>
    </transition>
    <youtube-media
      ref="youtube"
      v-if="ytId"
      v-show="!loading"
      @ready="onReady"
      @playing="onPlay"
      @error="clearProgressTracking"
      @paused="clearProgressTracking"
      :video-id="ytId"
      :player-vars="playerVars"
      :mute="playerVars.muted === 1"
      class="full-height"
      player-width="100%"
      player-height="100%"
    ></youtube-media>
  </span>
</template>

<script>
export default {
  props: {
    ytId: {
      type: String,
      default: null
    },
    poster: {
      type: String,
      default: null
    },
    playerVars: {
      type: Object,
      default: () => ({ autoplay: 1 })
    }
  },
  data() {
    return { ended: false, loading: true, interval: null, player: null }
  },
  methods: {
    calculateProgress() {
      if (this.player) {
        const elapsed = Math.round(this.player.getCurrentTime())
        const total = Math.round(this.player.getDuration())
        return total - elapsed > 2 ? Math.round((elapsed / total) * 100) : 100
      } else {
        return 0
      }
    },
    clearProgressTracking() {
      clearInterval(this.interval)
      this.interval = null
    },
    onReady(evt) {
      this.player = evt.target
    },
    onEnded(evt) {
      this.ended = true
      if (this.playerVars.loop) {
        this.rePlay(this.ytId)
      } else {
        this.clearProgressTracking()
      }
    },
    onPlay() {
      const data = this.player.getVideoData()
      setTimeout(() => {
        if (this.loading) {
          this.player.seekTo(0)
          this.loading = false
          this.$emit('loaded', this.ytId)
        }
      }, 3000)
      if (!this.interval) {
        let lastProgress = null
        this.interval = setInterval(() => {
          if (
            lastProgress !== this.calculateProgress() &&
            this.calculateProgress()
          ) {
            lastProgress = this.calculateProgress()
            console.log(
              `YouTube Progress: Watched ${lastProgress}% of "${data.title}"`
            )
            if (lastProgress === 100) {
              this.onEnded()
            }
          }
        }, 3000)
      }
    },
    rePlay() {
      this.player.seekTo(0)
    }
  }
}
</script>