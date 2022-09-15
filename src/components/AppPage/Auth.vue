<script setup lang='ts'>
import { onShow } from '@dcloudio/uni-app'
import { handleNoPermissions } from '~/logic/guard/intercept'
import { pageAllowAccess } from '~/logic/guard/permission-guard'
import { setupParams } from '~/utils/common/url'
import { useSearchParams } from '~/composables/tools'

const query = useSearchParams()
const route = useRoute()

const allowAccess = $computed(() => {
  return pageAllowAccess(route.path!)
})

onShow(() => {
  checkPermission()
})

function checkPermission() {
  return new Promise((resolve) => {
    // 没有token
    if (!pageAllowAccess(route.path)) {
      const url = setupParams(route.path, query.value)
      return handleNoPermissions(url)
    }

    return resolve('ok')
  })
}
</script>

<template>
  <template v-if="allowAccess">
    <slot />
  </template>
</template>

