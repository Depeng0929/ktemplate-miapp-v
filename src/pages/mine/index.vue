<script setup lang="ts">
import { usePageShow } from '~/logic/guard/page-loading';

usePageShow(() => {
  debug('ok')
})
</script>

<template>
  <AppPage>
    mine
  </AppPage>
</template>
