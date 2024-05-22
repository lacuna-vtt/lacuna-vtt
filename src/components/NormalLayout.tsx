import { ReactNode } from "react";
import LacunaNavbar from "./LacunaNavbar";

interface NormalLayoutProps {
  children?: ReactNode;
}

export default function NormalLayout(props: NormalLayoutProps) {
  return (
    <div className="container">
      <LacunaNavbar />
      {props.children}
    </div>
  );
}
