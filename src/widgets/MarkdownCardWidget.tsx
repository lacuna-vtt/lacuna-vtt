import { ReactNode } from "react";

export interface MarkdownCardWidgetProps {
  documentId: string;
  title: string;
  text: string;
  deleteAction: () => void;
  children?: ReactNode;
}

export default function MarkdownCardWidget(props: MarkdownCardWidgetProps) {
  return (
    <div className="markdown-card-widget box is-flex is-flex-direction-column">
      <div className="markdown-card-widget-title is-flex is-align-self-flex-start is-flex-grow-0">
        {props.title}
        <button
          className="delete is-pulled-right"
          onClick={props.deleteAction}
        ></button>
      </div>
      <div className="markdown-card-widget-body is-flex is-align-self-flex-start is-flex-grow-0">
        {props.text}
      </div>
    </div>
  );
}
