// Decorator Metadata keys
export const METADATA_PATH = 'route-path';
export const METADATA_METHOD = 'route-method';
export const METADATA_CONTROLLER_WATERMARK =
  '__controller__';
export const METADATA_ROUTE_ARGS = '__routeArguments__';

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
  // REQUEST = 0,
  // RESPONSE = 1,
  // NEXT = 2,

  // QUERY = 'query',
  // PARAM = 5,
  // HEADERS = 6,
  // SESSION = 7,
  // FILE = 8,
  // FILES = 9,
  // HOST = 10,
  // IP = 11,
}
