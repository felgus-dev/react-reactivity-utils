import * as React from 'react';

export const useMemoState = (memoFn: () => any, depsList: any[]) => {
  const [state, setState] = React.useState(() => memoFn());

  React.useEffect(() => {
    setState(memoFn());
  }, depsList)

  return [state, setState];
};