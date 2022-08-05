export type PickerMode = 'selector' | 'date'

export interface PickerProps {
  mode?: PickerMode
  modelValue?: string | number
  list?: Array<{ key: string | number; name: unknown }>
  end?: string | number
  className?: string | Array<string>
}
