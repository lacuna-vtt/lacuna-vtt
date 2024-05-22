import { ReactNode, useState } from "react";
import NormalLayout from "../components/NormalLayout";
import { useNakamaContext } from "../NakamaContext";

interface DebugPageProps {
  children?: ReactNode;
}

export default function DebugPage(props: DebugPageProps) {
  const ctx = useNakamaContext();

  return (
    <NormalLayout>
      <pre>{JSON.stringify(ctx, null, 2)}</pre>
    </NormalLayout>
  );
}
