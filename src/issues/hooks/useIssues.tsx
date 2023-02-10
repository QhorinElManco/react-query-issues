import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { githubAPI } from "../../api/githupApis";
import { IIssue, IIssueState } from "../interfaces/";

interface Props {
  state?: IIssueState;
  labels: string[];
  page?: number;
}

const getIssues = async ({
  labels,
  page = 1,
  state,
}: Props): Promise<IIssue[]> => {
  const params = new URLSearchParams();

  if (state) params.append("state", state);

  if (labels.length > 0) {
    const labelString = labels.join(",");
    params.append("labels", labelString);
  }

  params.append("page", page.toString());
  params.append("per_page", "5");

  const { data } = await githubAPI.get<IIssue[]>("/issues", { params });
  return data;
};

export const useIssues = ({ state, labels }: Props) => {
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    setPage(1);
  }, [state, labels]);

  const issuesQuery = useQuery(["issues", { state, labels, page }], () =>
    getIssues({ labels, page, state })
  );

  const nextPage = () => {
    if (issuesQuery.data?.length === 0) return;
    setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  return {
    // Properties
    issuesQuery,
    // Getters
    page: issuesQuery.isFetching ? "Loading" : page,
    // Setters
    nextPage,
    prevPage,
  };
};
