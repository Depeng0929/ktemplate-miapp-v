<script setup lang="ts">
import { useButton } from '~/composables/button'

function onClick() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(1)
    }, 2000)
  })
}
const submit = reactive(useButton(onClick))

const list = [
  { key: 10, name: 'woshi1' },
  { key: 11, name: 'woshi2' },
  { key: 12, name: 'woshi3' },
]
const current = ref('')

const html = '<p class="ql-align-justify"><img src="https://api.sqlyc.com.cn:2443/profile/upload/2022/06/10/c35ad423-4a7e-45e4-9355-45cd332bc367.jpg"><img src="https://api.sqlyc.com.cn:2443/profile/upload/2022/06/10/489490b0-7dfa-4f41-ba32-b97a4c4f6abb.jpg"></p><p><span style="font-size: 1.14rem;">        1月31日大年三十上午，市文旅集团党委书记、董事长张辉，党委副书记、皂河文旅公司董事长金龙成到皂河龙运城工程施工现场，走访慰问坚守在施工一线的工人，详细了解他们的生产生活情况，送上新春礼包，并向大家致以诚挚的问候和新春的祝福。</span></p><p><span style="font-size: 1.14rem;">        据了解，现场有1000余名工人积极响应“就地过年”号召，主动选择“在项目上守岁，在工地上过年”，奋战施工一线，抢抓工期，保证工程建设进度。集团结合节日期间实际情况，优化工作机制，完善相关制度，全方位做好后勤保障和疫情防控等各项工作，确保节日期间工程建设制度和规范标准常态化落实，同时开展设计优化、后场制作等工作，做到现场不停工，后场不放假，为顺利开园打下坚实基础。集团还利用春节期间人员返乡时机，积极开展商业招商、人员招聘线上线下宣传发动，引导周边居民前来创业就业。</span></p><p><span style="font-size: 1.14rem;">        张辉对大家一年来的辛勤工作表示感谢，叮嘱一定要合理安排好春节期间的施工生产工作，做好防疫工作，强化责任意识，始终把安全生产放在首位，加强值班值守和应急保障，确保每一位工人过一个祥和喜庆的春节。张辉还来到商业招商、人员招聘现场，了解相关工作开展情况，慰问现场工作人员。</span></p>'
</script>

<template>
  <AppPage>
    <AppPicker
      v-model="current"
      mode="date"
      :list="list"
    >
      <template #default="slotProps">
        <AppButton :status="submit.status" @click="submit.onClick">
          {{ slotProps.value }}
        </AppButton>
      </template>
    </AppPicker>

    <view class="mt-4 w-full border bg-theme">
      {{ current }}
    </view>
    <uni-badge text="1" type="primary" />

    <Reader :html="html" />
  </AppPage>
</template>
