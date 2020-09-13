<template>
  <h5
    v-bind="$attrs"
    v-on="$listeners"
    class="subheading text-uppercase font-weight-medium mt-1 mb-3"
  >
    <slot />
  </h5>
</template>

<script>
export default {
  name: 'Subheading'
}
</script>
