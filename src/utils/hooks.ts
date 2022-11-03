import { useEffect, useRef } from "react";

export const useSkipFirstEffect = (fn: () => void, dependencies: any[]) => {
  const isFirstMount = useRef(true);

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    fn();
  }, dependencies);
};
