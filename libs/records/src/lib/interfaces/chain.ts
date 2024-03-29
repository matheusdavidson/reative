export interface Chain {
  ttl?: number; // time to live (in seconds. default: 0)
  key?: string; // key used for cache. defaults to requested info
  useState?: boolean; //  use state for first response
  useCache?: boolean; //  use cache for first response
  useNetwork?: boolean; // use network for first response
  saveNetwork?: boolean; // save network response
  transformResponse?: (data: any) => any; // transform function for network data response
  transformData?: boolean; // shortcut for transform(r=>r.data)
  ref?: string; //  used for firebase driver
  query?: any; // @deprecated
  size?: number; // elastic/firestore
  sort?: any | any[]; // elastic/firestore
  doc?: string | number; // firestore `on`
  at?: string | number; // firestore
  after?: string | number; // firestore

  diff?: (fn: (cache: any, network: any) => boolean) => any; // customize rr response behavior
}
