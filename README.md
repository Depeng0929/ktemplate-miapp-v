# template-minapp
个人常用的uniapp模版,支持微信和小程序.

## Support
* 微信基础库 >= `2.11.0`
* ios >= `11.0`, Android >= `6.0`

## 特性
* Vite, Vue3, pnpm

* Pinia状态管理

* TailwindCss

* TypeScript

* 新的`<script setup>` 语法糖, 默认开启响应式语法糖

* 支持VueUse部分功能,详见[composables文件夹](https://github.com/Depeng0929/ktemplate-miapp-v/tree/main/src/composables)

* `unplugin-auto-import` 和 `unplugin-vue-components` 自动引入

* 内置开发过程中常用工具 ,详见[utils文件夹](https://github.com/Depeng0929/ktemplate-miapp-v/tree/main/src/utils)

* 内置组件库[uni-ui](https://uniapp.dcloud.net.cn/component/uniui/uni-ui.html)

* 🔥持续更新中

## Setup

1. replace `[project-name]` with your project name

2. replace `#1B2B34` with your theme color name

## 内置组件

* AppPage: 每个页面的根节点，用于权限控制和属性配置

```vue
usePageShow(() => {
  debug(['1'])
})

<AppPage>
  内容
</AppPage>
```

* AppPicker: picker组件结合cell组件，用于选择某个值

```vue
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
```

* QRcode: 生成二维码

* AppButton: 按钮组件

```vue

<AppButton :status="submit.status" @click="submit.onClick">
  {{ slotProps.value }}
</AppButton>

import { useButton } from '~/composables/button';

function onClick() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(1)
    }, 2000)
  })
}
const submit = reactive(useButton(onClick))
```

* AppImage: Image组件，内置loadding

```vue
<AppImage src="logo1.png" width="200" height="200" />
```

* Reader: html parse组件

* List: 带有插槽的列表组件

```vue
<List :list="list">
  <template #default="{item}: {item: {name: string}}">
    <view>
      {{ item.name }}
    </view>
  </template>
</List>
```

## 使用技巧

* useButton: reactive hooks for loadding

```js
function onClick() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(1)
    }, 2000)
  })
}
const submit = reactive(useButton(onClick))
```

* useSearchParams: 获取参数

* useLoading: 常用于提交

```js
useLoading(sleep(1000))
```

* whenever

* toast、confirm、alert

* useBus、useButton、useClipboard、useList、useRouter、useShare、useTitle、

