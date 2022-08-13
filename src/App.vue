<script setup lang="ts">
import { useStystemStore } from '~/store/system'

const { initSystemInfo } = useStystemStore()

onLaunch(() => {
  initSystemInfo()
})
</script>

<style lang="scss">
@import '~/styles/index.scss';
</style>
