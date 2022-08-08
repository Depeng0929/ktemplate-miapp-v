<script setup lang="ts">
const router = useRouter()

function onLogin() {
  router.push('/pages/login/index')
}

function onMine() {
  router.push('/pages/mine/index')
}

const list = [
  '1',
  '2',
  '3',
]

</script>

<template>
  <AppPage>
    <uni-badge text="1" type="primary" />

    <AppButton @click="onLogin">
      授权登录
    </AppButton>
    <AppButton class-name="mt-4" @click="onMine">
      我的
    </AppButton>
    <AppSwiper :list="list" />
  </AppPage>
</template>
