import { ReactNode } from "react";
import { useNakamaContext } from "../NakamaContext";

interface NakamaLoginRequiredProps {
  children?: ReactNode;
  onerror?: ReactNode;
}

/**
 * Require that the user be logged in to view the child components.
 * Show the onerror commponent (or a default message) otherwise.
 */
export default function NakamaLoginRequired(props: NakamaLoginRequiredProps) {
  const ctx = useNakamaContext();

  const onError = props.onerror || (
    <>
      <h1 className="title">Login Required</h1>
      <p>You must be logged in to view this page</p>
    </>
  );

  return (
    <div className="container">
      {ctx.isConnected ? props.children : onError}
    </div>
  );
}
