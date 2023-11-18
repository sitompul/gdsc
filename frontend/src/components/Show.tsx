import { ReactNode, FC } from "react";

type Props = {
  when: boolean;
  fallback?: ReactNode;
  children: ReactNode;
}

const Show: FC<Props> = function(p) {
  if (p.when) return p.children;
  return p.fallback;
}

export default Show;
