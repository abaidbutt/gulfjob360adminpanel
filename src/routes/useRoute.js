
import { useEffect } from 'react';

import { MyAppRoute } from './MyAppRoute';

export default function useRefresh(history, path, resetRoute = MyAppRoute.Index) {
  let handler;

  const refresh = () => {
    history.push(resetRoute);

    handler = setTimeout(() => history.push(path), 10);
  };

  useEffect(() => {
    return () => handler && clearTimeout(handler);
  }, [handler]);

  return refresh;
}