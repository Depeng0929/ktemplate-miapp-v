内置ramda
```js
R.find(R.props('a', 2))(list)
```

vuese
```js
import { reactiveComputed } from '@vueuse/core'

const state = reactiveComputed(() => {
  return {
    foo: 'bar',
    bar: 'baz',
  }
})

state.bar // 'baz'
```
