# useList
由于小程序不支持传递函数，所以List只能配合useList使用。

```js
const { onNext } = useList(request)

// uniapp只支持page.json页面使用此方法
onReachBottom(() => {
  onNext()
})
```
