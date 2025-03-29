// Decorator Metadata keys
export const METADATA_PATH = 'route-path';
export const METADATA_METHOD = 'route-method';
export const METADATA_ROUTE_ARGS = '__routeArguments__';
export const METADATA_CONTROLLER_WATERMARK = '__controller__';
export const METADATA_INJECTED = '__injected__';
export const MD_OAPI_CLASS_SCHEMA = '__oapi_class_schema__';
export const MD_OAPI_PROPERTIES = '__oapi_properties__';
export const MD_OAPI_RESPONSES = '__oapi_responses__';

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
  EVENT = 'event',
  // FILE = 'file',
  // FILES = 'files',
  CUSTOM = 'custom',
}
