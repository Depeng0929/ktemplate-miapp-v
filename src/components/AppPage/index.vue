<script setup lang='ts'>
import Auth from './Auth.vue'
import Preload from './Preload.vue'
</script>

<template>
  <div class="min-h-screen app-page">
    <Preload>
      <Auth>
        <slot />
      </Auth>
    </Preload>
  </div>
</template>
