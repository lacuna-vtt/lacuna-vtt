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
        <nav className="level">
          <div className="level-left">
            <div className="level-item">
              <strong>{props.title}</strong>
            </div>
          </div>
          <div className="level-right">
            <div className="level-item">
              <button
                className="delete is-pulled-right"
                onClick={props.deleteAction}
              ></button>
            </div>
          </div>
        </nav>
      </div>
      <div className="markdown-card-widget-body is-flex is-align-self-flex-start is-flex-grow-0">
        {props.text}
      </div>
    </div>
  );
}
