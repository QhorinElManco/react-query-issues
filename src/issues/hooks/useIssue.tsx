import { useQuery } from "@tanstack/react-query";
import { githubAPI } from "../../api/githupApis";
import { IIssue } from "../interfaces";

export const getIssueInfo = async (issueNumber: number): Promise<IIssue> => {
  const { data } = await githubAPI.get<IIssue>(`issues/${issueNumber}`);
  return data;
};

export const getIssueComments = async (
  issueNumber: number
): Promise<IIssue[]> => {
  const { data } = await githubAPI.get<IIssue[]>(
    `issues/${issueNumber}/comments`
  );
  return data;
};

export const useIssue = (issueNumber: number) => {
  const issueQuery = useQuery(["issue", issueNumber], () =>
    getIssueInfo(issueNumber)
  );

  const commentsQuery = useQuery(
    ["issue", issueNumber, "comments"],
    () => getIssueComments(issueQuery.data!.number),
    {
      enabled: issueQuery.data !== undefined,
    }
  );

  return { issueQuery, commentsQuery };
};
