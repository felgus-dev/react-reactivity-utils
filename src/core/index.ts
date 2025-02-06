import { useState, useMemo } from 'react';

export const useCoreReactive = <T,>(factory: () => T, deps: React.DependencyList = []): [T, React.Dispatch<any>] => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const memoSignal = useMemo(() => deps ? [...deps] : [], deps);
    const [memoSignalCache, setMemoSignalCache] = useState(() => memoSignal);
    const [state, setState] = useState(() => factory());
  
    if (!Object.is(memoSignal, memoSignalCache)) {
      const newMemoValue = factory();
  
      if (newMemoValue !== undefined) {
        setState(newMemoValue);
      }
  
      setMemoSignalCache(memoSignal);
    }
  
    return [state, setState];
  }