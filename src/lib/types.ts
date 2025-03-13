import type { H3Event as H3E } from 'h3';
import { RouteParamTypes } from '~/src/lib/constants';

export type NustHandler = {
  route: string;
  method: string;
  fn: string;
  controllerKey: string;
};

export type NustControllers = Record<string, any>;

export type H3Event = H3E;

export interface Type<T = any> extends Function {
  new (...args: any[]): T;
}

export interface RouteParamMetadata {
  index: number;
  type: RouteParamTypes;
  data?: any;
}
export type InjectedDepType = {
  index: number;
  dependency: any;
};
