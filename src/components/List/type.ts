export interface ListExtraProps {
  _id: number
  animationData: any
}

export type IListItem<T> = T extends Object ? T & ListExtraProps : ListExtraProps & {
  value: T
}
