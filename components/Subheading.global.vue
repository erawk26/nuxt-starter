<template>
  <h5
    v-bind="$attrs"
    v-on="$listeners"
    class="subheading text-uppercase font-weight-medium"
  >
    <slot />
  </h5>
</template>

<script>
export default {
  name: 'Subheading'
}
</script>
