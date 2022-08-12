<script setup lang="ts">
import { useStystemStore } from '~/store/system'

const { initSystemInfo } = useStystemStore()

onLaunch(() => {
  initSystemInfo()
})
</script>
