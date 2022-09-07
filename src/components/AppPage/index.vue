<script lang="ts" setup>
import { isH5 } from '~/utils/index'

const pageStyles = $computed(() => {
  if (isH5) {
    return {
      minHeight: 'calc(100vh-44px)',
    }
  }

  return {
    minHeight: '100vh',
  }
})
</script>

<template>
  <div class="app-page" :style="pageStyles">
    <Auth>
      <Preload>
        <slot />
      </Preload>
    </Auth>
  </div>
</template>
