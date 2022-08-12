export interface IFindResult<TResult, TAdditional = any> {
  data: Array<TResult>;
  additional?: TAdditional;
  total: number;
}
