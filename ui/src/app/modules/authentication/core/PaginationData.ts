// import {PageLink} from '../../../../_metronic/layout/core'
export interface PaginationData {
  current_page: number
  data: Array<any>
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  //   links: Array<PageLink>
  next_page_url: string
  path: string
  per_page: number
  to: number
  total: number
}

export class PageLinks {
  active: boolean
  label: any
  url: any | null
  constructor(active = false, label = '', url = '') {
    ;(this.active = active), (this.label = label), (this.url = url)
  }
}
export class DataWithPagination {
  current_page: number
  data: Array<any>
  first_page_url: string
  from: number
  last_page: string
  last_page_url: any
  links: Array<PageLinks>
  next_page_url: string
  path: string
  per_page: any
  to: any
  total: any
  constructor(
    current_page = 0,
    data: Array<any>,
    first_page_url = '',
    from = 0,
    last_page = '',
    last_page_url = '',
    links: Array<PageLinks>,
    next_page_url = '',
    path = '',
    per_page = '',
    to = 0,
    total = 0
  ) {
    this.current_page = current_page
    this.data = data
    this.first_page_url = first_page_url
    this.from = from
    this.last_page = last_page
    this.last_page_url = last_page_url
    ;(this.links = links), (this.next_page_url = next_page_url)
    ;(this.path = path), (this.per_page = per_page), (this.to = to), (this.total = total)
  }
}
