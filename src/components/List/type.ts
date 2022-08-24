export interface ListExtraProps {
  _id: number
}

export type IListItem<T> = T extends Object ? T & ListExtraProps : ListExtraProps & {
  value: T
}
