import { FC, ReactNode, createContext, useContext, useState } from "react";

import { Null, useStateType } from "../types/general";

// IMPORTANT:
// Global state for a string, for saving objects etc check globalStateComplex.
// To use apply <ErrorMessageProvider> on main.tsx
// To create new Global State, copy all the contents below and replace "ErrorMessage" with "YourGlobalStateName"

const ErrorMessageContext = createContext<Null<useStateType<string>>>(null);

type ErrorMessageProps = {
  children: ReactNode;
}
export const ErrorMessageProvider: FC<ErrorMessageProps> = function(p) {
  const [get, set] = useState("");

  return <ErrorMessageContext.Provider
    value={[get, set]}
  >
    {p.children}
  </ErrorMessageContext.Provider>;
}

export function useErrorMessage() {
  const res = useContext(ErrorMessageContext);
  return res || useState("");
}
