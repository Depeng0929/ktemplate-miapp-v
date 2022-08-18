import type { Ref } from 'vue'
import { isObject } from '@depeng9527/tools'
import type { IListItem } from './type'
import type { ListOptions, ListStatus } from '~/types'

export function useList<T = any>(options: ListOptions<T>) {
  const {
    fetch,
    size = 10,
    immediately = true,
  } = options
  let _id = 0

  const list = ref<[]>([]) as Ref<IListItem<T>[]>

  const page = reactive<API.Page & { value: number }>({
    value: 1,
    total: 0,
  })

  const totalPage = computed(() => {
    return Math.ceil(page.total / size)
  })

  const status = reactive({
    show: false, // 第一次请求不显示loading和empty，以此提升用户体验
    loading: false,
    isFinish: computed(() => {
      return page.value >= totalPage.value
    }),
    isEmpty: computed(() => {
      return page.total === 0
    }),
  }) as ListStatus
  const flag = ref(false)

  const fetchData = async() => {
    status.loading = true
    flag.value = true

    try {
      const { rows, total } = await fetch({
        pageNum: page.value,
        pageSize: size,
      }).finally(() => {
        status.loading = false
        flag.value = false
      })
      const processedRows = rows.map(item => createItem(item))

      page.total = total
      list.value = [...list.value, ...(processedRows as IListItem<T>[])]
      status.show = true
    }
    catch (error) {
      throw new Error(JSON.stringify(error))
    }
  }

  onBeforeMount(() => {
    if (immediately)
      fetchData()
  })

  // 手动翻页
  function onNext() {
    if (!flag.value)
      _onNext()
  }
  function _onNext() {
    if (page.value >= totalPage.value) return false

    page.value += 1
    fetchData()
  }

  // 还原，然后请求
  function onReset() {
    page.value = 1
    page.total = 0
    list.value = []
    status.show = false
    status.loading = false
    return fetchData()
  }

  function createItem(item: T) {
    const processedItem = isObject(item) ? item as T : { value: item as T }
    return {
      ...(processedItem as IListItem<T>),
      _id: _id++,
    }
  }

  function addItem(item: T) {
    list.value.push(createItem(item))
  }

  function removeItem(item: IListItem<T>) {
    const index = list.value.indexOf(item)
    if (index !== -1)
      list.value.splice(index, 1)
  }

  return {
    list,
    addItem,
    removeItem,
    onNext,
    onReset,
    status,
    fetchData,
  }
}
