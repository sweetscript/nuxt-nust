// Decorator Metadata keys
export const METADATA_PATH = 'route-path';
export const METADATA_METHOD = 'route-method';
export const METADATA_ROUTE_ARGS = '__routeArguments__';
export const METADATA_CONTROLLER_WATERMARK = '__controller__';
export const METADATA_INJECTED = '__injected__';

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

export enum RouteParamTypes {
  BODY = 'body',
  RAW_BODY = 'raw_body',
  PARAM = 'param',
  QUERY = 'query',
  IP = 'ip',
  CUSTOM = 'custom',
  // FILE = 'file',
  // FILES = 'files',
  // HOST = 'host,
}
