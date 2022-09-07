<script lang="ts" setup>
import { isH5 } from '~/utils/index'

const pageStyles = $computed(() => {
  if (isH5) {
    return {
      minHeight: 'calc(100vh - 44px)',
    }
  }

  return {
    minHeight: 'calc(100vh - 4px)',
  }
})
</script>

<template>
  <div class="app-page border-top !border-transparent" :style="pageStyles">
    <Auth>
      <Preload>
        <slot />
      </Preload>
    </Auth>
  </div>
</template>

