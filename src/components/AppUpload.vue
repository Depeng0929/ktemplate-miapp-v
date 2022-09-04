<script setup lang="ts">
import { p, sleep } from '@depeng9527/tools'
import { useVModel } from '~/composables/useVModel'
import { fileName, getExtName } from '~/utils';

const props = defineProps<{
  modelValue?: Array<string>
  type?: 'image' | 'video' | 'all'
  limit?: number
}>()
const {
  type = 'image',
  limit = 9,
} = props

const imageList = useVModel(props, 'modelValue')
const fileList = computed(() => {
  return imageList.value?.map(url => ({
    url,
    name: fileName(url),
    extname: getExtName(url),
  }))
})

async function select(e: any) {
  const { tempFiles } = e
  const urlList = await p(tempFiles)
    .map(async (item: any) => await uploadImage(item))

  imageList.value = urlList
}

async function uploadImage(tempFile: any) {
  const { name: rawFileName, path: localPath, uuid } = tempFile
  return sleep(1000, () => {
    // 使用uni.uploadFile上传path
    // eslint-disable-next-line no-console
    console.log(rawFileName, localPath, uuid)
  }).then(() => {
    return 'https://api.sqlyc.com.cn:2443/profile/upload/2022/05/12/72ca745c-726f-4eaf-a448-52af735d34be.jpg'
  })
}

function onFail() {
  toast('上传失败，请重试！', 'error')
}

function onDelete(e: any) {
  const { tempFilePath } = e

  const index = imageList.value!.indexOf(tempFilePath)
  imageList.value!.splice(index, 1)
}
</script>

<template>
  <uni-file-picker
    v-model="fileList"
    :file-mediatype="type"
    :limit="limit"
    mode="grid"
    :auto-upload="false"
    @select="select"
    @fail="onFail"
    @delete="onDelete"
  />
</template>
