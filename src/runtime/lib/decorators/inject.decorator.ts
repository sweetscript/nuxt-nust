import 'reflect-metadata';
import { METADATA_INJECTED } from '../constants';
import type { InjectedDepType } from '../types';

export function Inject(dependency: any): ParameterDecorator {
  return (target, propertyKey, index) => {
    const injected: InjectedDepType[] =
      Reflect.getMetadata(METADATA_INJECTED, target) ?? [];
    injected.push({
      index: index,
      dependency,
    });
    Reflect.defineMetadata(METADATA_INJECTED, injected, target);
  };
}

export function resolveInjectedArgs(target: any): any[] {
  const injectedArgDeps: InjectedDepType[] =
    Reflect.getMetadata(METADATA_INJECTED, target) || [];
  return injectedArgDeps
    ? injectedArgDeps.map((arg) => {
        return new arg.dependency(
          resolveInjectedArgs(arg.dependency),
        );
      })
    : [];
}
