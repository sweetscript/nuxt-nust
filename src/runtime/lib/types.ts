import type { H3Event as H3E } from 'h3';
import type { RouteParamTypes } from './constants';

export type NustHandler = {
  route: string;
  method: string;
  fn: string;
  controllerKey: string;
};

export type NustControllers = Record<string, any>;

export type H3Event = H3E;

export interface RouteParamMetadata {
  index: number;
  type: RouteParamTypes;
  data?: any;
  meta?: any;
}
export type InjectedDepType = {
  index: number;
  dependency: any;
};
