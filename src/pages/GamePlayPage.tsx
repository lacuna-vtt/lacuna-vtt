import { ReactNode, useState } from "react";
import NormalLayout from "../components/NormalLayout";
import { useNakamaContext } from "../NakamaContext";
import NakamaLoginRequired from "../components/NakamaLoginRequired";
import PanelContainerWidget from "../widgets/PanelContainerWidget";
import MarkdownCardWidget from "../widgets/MarkdownCardWidget";

interface GamePlayPageProps {
  children?: ReactNode;
}

export default function GamePlayPage(props: GamePlayPageProps) {
  const ctx = useNakamaContext();
  const [cards, setCards] = useState<ReactNode[]>([]);

  const addCard = (_evt: any) => {
    const cardText = prompt("Text for new card");
    if (cardText) {
      const node = <MarkdownCardWidget text={cardText} />;
      setCards((cards) => [...cards, node]);
    }
  };

  return (
    <NormalLayout>
      <NakamaLoginRequired>
        <button className="button is-primary" onClick={addCard}>
          Add Card
        </button>
        <PanelContainerWidget>{cards}</PanelContainerWidget>
      </NakamaLoginRequired>
    </NormalLayout>
  );
}
