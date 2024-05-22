import { ReactNode, useState } from "react";
import NormalLayout from "../layouts/NormalLayout";
import { useNakamaContext } from "../NakamaContext";

interface DebugPageProps {
  children?: ReactNode;
}

export default function DebugPage(props: DebugPageProps) {
  const ctx = useNakamaContext();

  const logout = () => {
    ctx.socket?.disconnect(true);
  };

  return (
    <NormalLayout>
      <button className="button is-primary" onClick={logout}>
        Logout
      </button>

      <pre>{JSON.stringify(ctx, null, 2)}</pre>
    </NormalLayout>
  );
}
