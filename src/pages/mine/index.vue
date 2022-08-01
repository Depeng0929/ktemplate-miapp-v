<script setup lang="ts">
import { usePageShow } from '~/logic/permission.js';

usePageShow(() => {
  debug('ok')
})
</script>

<template>
  <AppPage>
    mine
  </AppPage>
</template>
