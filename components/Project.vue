<template>
  <div>
    {{ projectData.title }}
    {{ projectData.skillls }}
    {{ projectData.body }}
  </div>
</template>

<script>
export default {
  props: {
    projectData: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style lang="scss" scoped></style>
