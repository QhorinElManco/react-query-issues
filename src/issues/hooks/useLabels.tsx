import { useQuery } from "@tanstack/react-query";
import { githubAPI } from "../../api/githupApis";
import { ILabel } from "../interfaces/label";

const getLabels = async (): Promise<ILabel[]> => {
  const { data } = await githubAPI.get("/labels?per_page=100", {
    headers: {
      Authorization: null,
    },
  });
  return data;
};

export const useLabels = () => {
  const labelsQuery = useQuery(["labels"], getLabels);

  return { labelsQuery };
};
