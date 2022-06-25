type PickerType = 'selector' | 'date'
type IPickerConfig<T extends PickerType, K = unknown> = {
  mode: T
  current: K
} & (T extends 'selector' ? {
  list: Array<{ key: K; name: string }>
} : {
  start?: number | string
  end?: number | string
  fields?: 'year' | 'month' |'day'
})
