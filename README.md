# template-minapp
个人常用的uniapp模版,支持微信和小程序.

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

## 内置组件

* AppPage: 每个页面的根节点，用于权限控制和属性配置

* AppPicker: picker组件结合cell组件，用于选择某个值

* QRcode: 生成二维码

* AppButton: 按钮组件

* AppImage: Image组件，内置loadding

* Reader: html parse组件

* List: 带有插槽的列表组件

## 使用技巧

* useFetch: LRU缓存，同swr, 权限校验

```js
const { data, error, loadding } = useFetch < User > ({
  url: 'http://127.0.0.1:4523/m1/1339598-0-default/user',
  method: 'GET',
})
```

api中使用

```js
export function fetchUser() {
  return useFetch < User > ({
    url: 'http://127.0.0.1:4523/m1/1339598-0-default/user',
    method: 'GET',
  })
}
```


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
