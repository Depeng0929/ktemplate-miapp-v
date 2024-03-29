import type { Ref } from 'vue'
import { isObject } from '@depeng9527/tools'
import to from 'await-to-js'
import type { IListItem, ListExtraProps } from './type'
import { confirm } from '~/utils/index'
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

  const fetchData = async () => {
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
      list.value = [...list.value, ...processedRows]
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
    if (page.value >= totalPage.value)
      return false

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

  function createItem(item: T): IListItem<T> {
    const processedItem = isObject(item) ? item as T : { value: item as T }
    const extraItem: ListExtraProps = reactive({
      _id: _id++,
    })
    return {
      ...processedItem,
      ...extraItem,
    } as IListItem<T>
  }

  async function addItem(item: T, fetcher?: (item: IListItem<T>) => Promise<void>) {
    showLoading()
    const processedItem = createItem(item)

    try {
      fetcher && await fetcher(processedItem)
    }
    catch (error) {
      debug(error)
      hideLoading()
    }

    hideLoading()
    list.value.push(processedItem)
  }

  async function removeItem(item: IListItem<T>, fetcher?: () => Promise<void>) {
    const [err] = await to(confirm('确定要删除此项？'))
    if (err)
      return false

    if (fetcher) {
      showLoading()
      const [err] = await to(fetcher())
      if (err) {
        debug(err)
        hideLoading()
        return false
      }
    }

    hideLoading()
    toast('删除成功', 'success')
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
