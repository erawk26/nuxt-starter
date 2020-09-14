<template>
  <h3
    v-bind="$attrs"
    v-on="$listeners"
    class="heading text-uppercase font-weight-medium"
  >
    <slot />
  </h3>
</template>

<script>
export default {
  name: 'Heading'
}
</script>
