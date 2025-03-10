// Decorator Metadata keys
export const METADATA_PATH = 'route-path'
export const METADATA_METHOD = 'route-method'
export const METADATA_CONTROLLER_WATERMARK = '__controller__'

export enum RequestMethod {
  get = 'get',
  post = 'post',
  put = 'put',
  delete = 'delete',
  patch = 'patch',
  options = 'options',
  all = 'all',
  head = 'head',
}
