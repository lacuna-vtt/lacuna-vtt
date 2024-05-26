import { ReactNode, useState } from "react";

interface MarkdownCardWidgetProps {
  title: string;
  text: string;
  children?: ReactNode;
}

export default function MarkdownCardWidget(props: MarkdownCardWidgetProps) {
  const [cardText, setCardText] = useState<string>(props.text);

  return (
    <div className="markdown-card-widget box is-flex is-flex-direction-column">
      <div className="markdown-card-widget-title is-flex is-align-self-flex-start is-flex-grow-0">
        {props.title}
      </div>
      <div className="markdown-card-widget-body is-flex is-align-self-flex-start is-flex-grow-0">
        {cardText}
      </div>
    </div>
  );
}
