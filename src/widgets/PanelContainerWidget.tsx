import { ReactNode } from "react";
import { Rnd } from "react-rnd";

interface PanelContainerWidgetProps {
  children?: ReactNode;
}

interface PanelChildProps {
  children?: ReactNode;
}

const isIterable = (value: any) => value?.[Symbol.iterator];

function PanelChild(props: PanelChildProps) {
  return (
    <Rnd
      default={{
        x: 0,
        y: 0,
        width: 320,
        height: 200,
      }}
    >
      {props.children}
    </Rnd>
  );
}

export default function PanelContainerWidget(props: PanelContainerWidgetProps) {
  const nodes: ReactNode[] = [];

  if (isIterable(props.children)) {
    // @ts-ignore
    for (let node of props.children) {
      nodes.push(node);
    }
  } else {
    nodes.push(props.children);
  }

  return (
    <div>
      {nodes.map((node) => (
        <PanelChild>{node}</PanelChild>
      ))}
    </div>
  );
}
