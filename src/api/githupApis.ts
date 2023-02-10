import axios from "axios";

export const githubAPI = axios.create({
  baseURL: "https://api.github.com/repos/facebook/react",
  headers: {
    Authorization:
      "Bearer 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",
  },
});
