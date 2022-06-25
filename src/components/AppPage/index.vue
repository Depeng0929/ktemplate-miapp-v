<script setup lang='ts'>
import Auth from './Auth.vue'
</script>

<template>
  <Auth>
    <div class="min-h-screen">
      <slot />
    </div>
  </Auth>
</template>
