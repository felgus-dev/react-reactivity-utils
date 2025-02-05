import { useCoreReactive } from "../core";

export const useMemoState = <T,>(factory: () => T, deps?: React.DependencyList) => {
  return useCoreReactive(factory, deps);
};