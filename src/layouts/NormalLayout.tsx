import { ReactNode } from "react";

interface NormalLayoutProps {
  children?: ReactNode;
}

export default function NormalLayout(props: NormalLayoutProps) {
  return <div className="container">{props.children}</div>;
}
