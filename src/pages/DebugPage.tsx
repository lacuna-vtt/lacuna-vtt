import { ReactNode, useState } from "react";
import NormalLayout from "../components/NormalLayout";
import { useNakamaContext } from "../NakamaContext";
import NakamaLoginRequired from "../components/NakamaLoginRequired";

interface DebugPageProps {
  children?: ReactNode;
}

export default function DebugPage(props: DebugPageProps) {
  const ctx = useNakamaContext();

  return (
    <NormalLayout>
      <NakamaLoginRequired>
        <pre>{JSON.stringify(ctx, null, 2)}</pre>
      </NakamaLoginRequired>
    </NormalLayout>
  );
}
