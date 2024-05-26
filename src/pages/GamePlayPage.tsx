import { ReactNode, useState } from "react";
import NormalLayout from "../components/NormalLayout";
import { useNakamaContext } from "../NakamaContext";
import NakamaLoginRequired from "../components/NakamaLoginRequired";
import PanelContainerWidget from "../widgets/PanelContainerWidget";
import MarkdownCardWidget from "../widgets/MarkdownCardWidget";

interface GamePlayPageProps {
  children?: ReactNode;
}

const LOREM = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit turpis cursus in hac habitasse. Aliquet enim tortor at auctor urna nunc id cursus metus. Cras tincidunt lobortis feugiat vivamus. Nisl condimentum id venenatis a condimentum vitae. Mauris vitae ultricies leo integer malesuada nunc vel. Integer eget aliquet nibh praesent tristique. Dapibus ultrices in iaculis nunc. Dolor magna eget est lorem ipsum dolor. Augue neque gravida in fermentum et. Id venenatis a condimentum vitae sapien pellentesque habitant morbi. Mauris ultrices eros in cursus turpis. Sit amet luctus venenatis lectus magna fringilla urna porttitor rhoncus. Et ultrices neque ornare aenean euismod elementum nisi quis eleifend. Eu nisl nunc mi ipsum faucibus vitae aliquet nec. Risus at ultrices mi tempus. Faucibus in ornare quam viverra orci. Semper risus in hendrerit gravida rutrum quisque non.`;

export default function GamePlayPage(props: GamePlayPageProps) {
  const ctx = useNakamaContext();
  const [cards, setCards] = useState<ReactNode[]>([]);

  const addCard = (_evt: any) => {
    const cardTitle = prompt("Text for new card");
    if (cardTitle) {
      const node = <MarkdownCardWidget title={cardTitle} text={LOREM} />;
      setCards((cards) => [...cards, node]);
    }
  };

  return (
    <NormalLayout>
      {/* <NakamaLoginRequired> */}
      <button className="button is-primary" onClick={addCard}>
        Add Card
      </button>
      <PanelContainerWidget>{cards}</PanelContainerWidget>
      {/* </NakamaLoginRequired> */}
    </NormalLayout>
  );
}
