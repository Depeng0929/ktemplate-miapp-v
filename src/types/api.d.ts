declare namespace API {
  export interface ResponseData<T = any> {
    code: number
    msg: string
    data: T
  }

  export type List<T> = Omit<ResponseData, 'data'> & {
    rows: T[]
  } & Page

  interface Page {
    total: number
  }

  export interface PageDTO {
    pageNum: number
    pageSize: number
  }
}
