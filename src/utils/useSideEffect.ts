import { useRef, useState, useEffect } from "react";

type Effect = (sync: () => void) => () => void;
type CreateSideEffect =( effect: Effect) => () => void;
const createSideEffect = (sync: () => void) => {
  let func: Effect = () => () => undefined;

  return (effect?: Effect) => {
    if (effect) {
      func = effect;
    } else {
      return func(sync);
    }
  }
}

export const useSideEffect = <T,>(factory: (effect: CreateSideEffect, ref: React.MutableRefObject<null>) => T | undefined, initialValue: T) => {
  const ref = useRef(null);
  const flag = useRef(false);
  const [value, setValue] = useState<T>(() => initialValue);

  useEffect(() => {
    const effect = createSideEffect(sync);
    function sync() {
      const newValue = factory(effect as CreateSideEffect, ref);
      if (newValue !== undefined) {
        setValue(newValue);
      }
    }

    const cleanup = effect();
    if(flag.current === false){
      flag.current = true;
      sync();
    }

    return cleanup;
  }, [factory]);

  return [value, ref];
};