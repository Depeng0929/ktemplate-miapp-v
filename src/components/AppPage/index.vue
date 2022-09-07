<script lang="ts" setup>
import { isH5 } from '~/utils/index'

const pageStyles = $computed(() => {
  if (isH5) {
    return {
      minHeight: 'calc(100vh - 45px)',
    }
  }

  return {
    minHeight: 'calc(100vh - 1px)',
  }
})
</script>

<template>
  <div class="app-page pt-[1px]" :style="pageStyles">
    <Auth>
      <Preload>
        <slot />
      </Preload>
    </Auth>
  </div>
</template>

