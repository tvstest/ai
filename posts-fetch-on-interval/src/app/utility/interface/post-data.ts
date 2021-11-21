export interface IPostFetchData {
  hits: Array<IPostFetchHitsData>
  page: number
  nbPages: number
}

export interface IPostFetchHitsData {
  // eslint-disable-next-line camelcase
  created_at?: string
  title?: string
  url?: string
  author?: string
  objectID: string
}
