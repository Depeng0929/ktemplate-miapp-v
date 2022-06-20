import type { Ref } from 'vue'
import type { ListOptions, ListStatus } from '~/types'

export function useList<T>(options: ListOptions<T>) {
  const {
    fetch,
    size = 10,
    immediately = true,
  } = options

  const list = ref<T[]>([]) as Ref<T[]>
  const page = reactive<API.Page & { value: number }>({
    value: 1,
    total: 0,
  })

  const totalPage = computed(() => {
    return Math.ceil(page.total / size)
  })
  const status = reactive({
    show: false, // 初次进入页面不显示loading,相当于flag
    loading: false,
    isFinish: computed(() => {
      return page.value >= totalPage.value
    }),
    isEmpty: computed(() => {
      return page.total === 0
    }),
  }) as ListStatus

  const fetchData = async() => {
    status.loading = true

    try {
      const { rows, total } = await fetch({
        pageNum: page.value,
        pageSize: size,
      }).finally(() => {
        status.loading = false
      })

      page.total = total
      list.value = [...list.value, ...rows]
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
    if (page.value >= totalPage.value) return false

    page.value += 1
    fetchData()
  }

  // 还原，然后请求
  function onReset() {
    page.value = 1
    page.total = 0
    list.value = []
    return fetchData()
  }

  return {
    list,
    onNext,
    onReset,
    status,
    fetchData,
  }
}
