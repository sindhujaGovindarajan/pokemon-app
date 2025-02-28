import { useState, useCallback } from "react";

const useToggle = (initialState: boolean = false) => {
  const [state, setState] = useState<boolean>(initialState);

  const toggle = useCallback((value?: boolean) => {
    setState((prevState) => (typeof value === "boolean" ? value : !prevState));
  }, []);

  return [state, toggle] as const;
};

export default useToggle;
