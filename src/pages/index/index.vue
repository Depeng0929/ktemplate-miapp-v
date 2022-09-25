<script setup lang="ts">
import { sleep } from '@depeng9527/tools';

const router = useRouter()

function onLogin() {
  router.push('/pages/login/index')
}

function onMine() {
  router.push('/pages/mine/index')
}

let list = $ref<any>([])
const current = $ref('')

sleep(1000, () => {
  list = [
    {
      name: 'Tom',
      key: 1,
    },
    {
      name: 'Tom1',
      key: 2,
    },
    {
      name: 'Tom2',
      key: 3,
    },
  ]
})
</script>

<template>
  <AppPage>
    <uni-badge text="1" type="primary" />
    <Avatar src="" />
    <AppPicker v-model="current" mode="selector" :list="list">
      <template #default="{ value }">
        <AppButton class-name="mt-4">
          测试picker{{ value }}
        </AppButton>
      </template>
    </AppPicker>

    <AppButton @click="onLogin">
      授权登录
    </AppButton>
    <AppButton class-name="mt-4" @click="onMine">
      我的
    </AppButton>
  </AppPage>
</template>
