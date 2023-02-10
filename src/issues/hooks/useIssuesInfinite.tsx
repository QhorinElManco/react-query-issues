import { useInfiniteQuery } from "@tanstack/react-query";
import { githubAPI } from "../../api/githupApis";
import { IIssue, IIssueState } from "../interfaces";

interface Props {
  state?: IIssueState;
  labels: string[];
  page?: number;
}

interface QueryProps {
  pageParam?: number;
  queryKey: (string | Props)[];
}

const getIssues = async ({
  pageParam = 1,
  queryKey,
}: QueryProps): Promise<IIssue[]> => {
  const [, , args] = queryKey;
  const { state, labels } = args as Props;

  const params = new URLSearchParams();

  if (state) params.append("state", state);

  if (labels.length > 0) {
    const labelString = labels.join(",");
    params.append("labels", labelString);
  }

  params.append("page", pageParam.toString());
  params.append("per_page", "5");

  const { data } = await githubAPI.get<IIssue[]>("/issues", { params });
  return data;
};

export const useIssuesInfinite = ({ state, labels }: Props) => {
  const issuesQuery = useInfiniteQuery(
    ["issues", "infinite", { state, labels }],
    (data) => getIssues(data),
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.length === 0) return;
        return pages.length + 1;
      },
    }
  );

  return {
    issuesQuery,
  };
};
