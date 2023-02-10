import { FC } from "react";
import { IIssue, IIssueState } from "../interfaces";
import { IssueItem } from "./IssueItem";

interface Props {
  issues: IIssue[];
  state?: IIssueState;
  onStateChanged: (state?: IIssueState) => void;
}

export const IssueList: FC<Props> = ({ issues, state, onStateChanged }) => {
  return (
    <div className="card border-white">
      <div className="card-header bg-dark">
        <ul className="nav nav-pills card-header-pills">
          <li className="nav-item">
            <a
              className={`nav-link ${!state ? "active" : ""}`}
              onClick={() => onStateChanged()}
            >
              All
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${
                state === IIssueState.Open ? "active" : ""
              }`}
              onClick={() => onStateChanged(IIssueState.Open)}
            >
              Open
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${
                state === IIssueState.Close ? "active" : ""
              }
              `}
              onClick={() => onStateChanged(IIssueState.Close)}
            >
              Closed
            </a>
          </li>
        </ul>
      </div>
      <div className="card-body text-dark">
        {issues.map((issue) => (
          <IssueItem key={issue.id} issue={issue} />
        ))}
      </div>
    </div>
  );
};
