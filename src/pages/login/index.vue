<script setup lang="ts">
import { useUserStore } from '~/store/user.js';

const userStore = useUserStore()

function onLogin() {
  userStore.fetchToken()
}
</script>

<template>
  <div>
    <AppButton @click="onLogin">
      登录
    </AppButton>
  </div>
</template>
