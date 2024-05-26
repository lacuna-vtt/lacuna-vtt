import { ReactNode, useState } from "react";

interface MarkdownCardWidgetProps {
  text: string;
  children?: ReactNode;
}

export default function MarkdownCardWidget(props: MarkdownCardWidgetProps) {
  const [cardText, setCardText] = useState<string>(props.text);

  return (
    <div className="card" style={{ height: "100%" }}>
      <div className="card-content">
        <div className="content">{cardText}</div>
      </div>
    </div>
  );
}
