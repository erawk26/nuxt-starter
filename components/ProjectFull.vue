<template lang="pug">
    span
        v-divider
        .eo-flex.wrap.j-center.a-start
            .cell.alpha.mt-2
                slot(name="body")
            .cell.omega.eo-flex.wrap.skills.mt-2(v-if="project.skills")
                small.full-width Skills:
                v-chip.mr-1.mb-1(small :to="'/skill/'+ kebab(skill)" ripple v-for="(skill, i) in project.skills" :key="'skill-'+i+1") {{skill}}
    
</template>

<script>
export default {
  props: {
    project: {
      type: Object,
      default: () => {}
    },
    projects: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped></style>
